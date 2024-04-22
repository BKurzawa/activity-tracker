import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

import { createDrawerNavigator } from "@react-navigation/drawer";
import {
	getFocusedRouteNameFromRoute,
	NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { IActivity, useActivityStore } from "./src/hooks/activityStore";
import ActivitiesList from "./src/screens/ActivitiesList";
import ActivityDetails from "./src/screens/ActivityDetails";
import HomeScreen from "./src/screens/HomeScreen";
import saveActivity from "./src/utils/storage/saveActivity";

import "react-native-gesture-handler";

export type RootStackParamList = {
	Activities: undefined;
	"Activity Details": { activity: IActivity };
};

export type RootDrawerParamList = {
	"New Activity": undefined;
	"Activity History": undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createStackNavigator<RootStackParamList>();

const FinishedActivities = () => {
	return (
		<Stack.Navigator initialRouteName="Activities">
			<Stack.Screen
				name="Activities"
				component={ActivitiesList}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="Activity Details"
				component={ActivityDetails}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};

export default function App() {
	const activity = useActivityStore((state) => state.activity);
	const resetActivity = useActivityStore((state) => state.resetActivity);

	return (
		<MenuProvider>
			<NavigationContainer>
				<Drawer.Navigator
					initialRouteName="New Activity"
					screenOptions={{ headerTitleAlign: "center" }}>
					<Drawer.Screen
						name="New Activity"
						component={HomeScreen}
						options={{
							headerRight: () =>
								!!activity.locations.length &&
								activity.isStopped && (
									<View style={styles.button}>
										<TouchableOpacity
											onPress={async () => {
												resetActivity();
											}}>
											<Entypo
												name="trash"
												size={24}
												style={{
													paddingRight: 20,
												}}
											/>
										</TouchableOpacity>
										<TouchableOpacity
											onPress={async () => {
												await saveActivity({ ...activity, isFinished: true });
												resetActivity();
											}}>
											<Entypo
												name="save"
												size={24}
												style={{
													paddingRight: 15,
												}}
											/>
										</TouchableOpacity>
									</View>
								),
						}}
					/>
					<Drawer.Screen
						name="Activity History"
						component={FinishedActivities}
						options={({ route, navigation }) => {
							const focusedName = getFocusedRouteNameFromRoute(route);
							return {
								headerTitle: focusedName ?? "Activity History",
								headerRight: () =>
									focusedName === "Activity Details" && (
										<View style={styles.button}>
											<TouchableOpacity
												onPress={async () => {
													navigation.navigate("Activities");
												}}>
												<Ionicons
													name="close-outline"
													size={30}
													style={{
														paddingRight: 20,
													}}
												/>
											</TouchableOpacity>
										</View>
									),
							};
						}}
					/>
				</Drawer.Navigator>
			</NavigationContainer>
		</MenuProvider>
	);
}

const styles = StyleSheet.create({
	button: {
		padding: 5,
		flexDirection: "row",
	},
});
