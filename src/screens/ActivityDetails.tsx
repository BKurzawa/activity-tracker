import React from "react";
import { StyleSheet, View } from "react-native";

import { RouteProp } from "@react-navigation/native";

import { RootStackParamList } from "../../App";
import DataGrid from "../components/DataGrid";
import FinishedActivityHeader from "../components/FinishedActivityHeader";
import Map from "../components/Map";
import { ILocation } from "../hooks/activityStore";
import { displayTime, getTime } from "../utils/datetime";

type ActivityDetailsRouteProp = RouteProp<
	RootStackParamList,
	"Activity Details"
>;

type Props = {
	route: ActivityDetailsRouteProp;
};
const ActivityDetails = ({ route: { params } }: Props) => {
	const { activity } = params;
	const { mins, hours, secs } = getTime(activity.summary.duration);
	const avgSpeed =
		activity.summary.distance / 1000 / (activity.summary.duration / 3600);

	let altitudeSum = 0;
	activity.locations.forEach(({ altitude }: ILocation) => {
		altitudeSum += altitude || 0;
	});
	return (
		<View style={{ ...styles.container }}>
			<Map locations={activity.locations} isActivityFinished />
			<FinishedActivityHeader date={displayTime(activity.summary.startTime)} />
			<DataGrid
				time={{
					mins,
					hours,
					secs,
				}}
				distance={activity.summary.distance}
				speed={avgSpeed}
				altitude={altitudeSum / activity.locations.length}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flex: 1,
		width: "100%",
		backgroundColor: "#000",
	},
});

export default ActivityDetails;
