import React from "react";
import { StyleSheet, View } from "react-native";

import Activity from "../components/Activity";
import Map from "../components/Map";
import { useActivityStore } from "../hooks/activityStore";

const HomeScreen = () => {
	const activity = useActivityStore((state) => state.activity);

	return (
		<View style={{ ...styles.container }}>
			<Map
				locations={activity.locations}
				isActivityFinished={activity.isFinished}
			/>
			<Activity />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default HomeScreen;
