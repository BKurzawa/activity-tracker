import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

import { IActivity } from "../hooks/activityStore";
import { getTime } from "../utils/datetime";

interface Props {
	activity: IActivity;
	handlePress: (activity: IActivity) => void;
	handleDelete: (activity: IActivity) => void;
}

const ListItem = ({ activity, handlePress, handleDelete }: Props) => {
	const { mins, hours, secs } = getTime(activity.summary.duration);
	const kilometersPassed = (activity.summary.distance / 1000).toFixed(2);
	const avgSpeed = (
		activity.summary.distance /
		1000 /
		(activity.summary.duration / 3600)
	).toFixed(2);
	return (
		<TouchableOpacity onPress={() => handlePress(activity)}>
			<View style={styles.container}>
				<View>
					<Text>{new Date(activity.summary.startTime).toLocaleString()}</Text>
				</View>
				<View style={styles.rowContainer}>
					<View style={styles.itemsContainer}>
						<View style={styles.item}>
							<Text>Distance</Text>
							<Text>{kilometersPassed} km</Text>
						</View>
						<View style={styles.separator} />
						<View style={styles.item}>
							<Text>Time</Text>
							<Text>{`${hours}h:${mins}m:${secs}s`}</Text>
						</View>
						<View style={styles.separator} />
						<View style={styles.item}>
							<Text>Avg. Speed</Text>
							<Text>{avgSpeed} km/h</Text>
						</View>
					</View>
					<View>
						<TouchableOpacity
							onPress={async () => {
								handleDelete(activity);
							}}>
							<Entypo
								name="trash"
								size={24}
								style={{
									paddingRight: 20,
								}}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		width: "100%",
		padding: 10,
		borderBottomWidth: 1,
	},
	rowContainer: {
		flex: 1,
		flexDirection: "row",
		width: "100%",
		padding: 10,
	},
	itemsContainer: {
		flex: 1,
		flexDirection: "row",
		width: "100%",
		padding: 10,
	},
	item: {
		flexDirection: "column",
		flexShrink: 1,
		textAlign: "left",
		alignSelf: "center",
	},
	separator: {
		height: "70%",
		width: 2,
		backgroundColor: "#72a3f2",
		alignSelf: "center",
		marginHorizontal: 10,
	},
});

export default ListItem;
