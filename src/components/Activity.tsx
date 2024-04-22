import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { LocationObject } from "expo-location";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { getPreciseDistance } from "geolib";
import BackgroundTimer from "react-native-background-timer";

import { useActivityStore } from "../hooks/activityStore";
import { getTime } from "../utils/datetime";
import { getCoords, getKmph } from "../utils/geo";
import { checkLocationPermissions } from "../utils/permissions";

import DataGrid from "./DataGrid";
import PlayButton from "./PlayButton";

interface DistancePassed {
	distance: number;
	sections: number;
}

const BACKGROUND_LOCATION_TASK = "background-location-task";

TaskManager.defineTask(
	BACKGROUND_LOCATION_TASK,
	({
		data,
		error,
	}: {
		data: TaskManager.TaskManagerTaskBody["data"] & {
			locations: LocationObject;
		};
		error: TaskManager.TaskManagerTaskBody["error"];
	}) => {
		if (error) {
			console.log("Location tracking error occured!", error.message);
			return;
		}
		console.log("Received new locations", data);
		const {
			coords: { latitude, longitude, speed, altitude },
			timestamp,
		} = data.locations[0];

		useActivityStore.setState((prevState) => {
			const currentActivity = useActivityStore.getState().activity;
			return {
				activity: {
					...prevState.activity,
					locations: [
						...currentActivity.locations,
						{ latitude, longitude, speed, altitude, timestamp },
					],
				},
			};
		});
	},
);

const Activity = () => {
	const [secondsPassed, setSecondsPassed] = useState<number>(0);
	const [currentSpeed, setCurrentSpeed] = useState<number>(0);
	const [currentAltitude, setCurrentAltitude] = useState<number>(0);
	const [distancePassed, setDistancePassed] = useState<DistancePassed>({
		distance: 0,
		sections: 0,
	});
	const [timerOn, setTimerOn] = useState(false);
	const activity = useActivityStore((state) => state.activity);
	const setActivity = useActivityStore((state) => state.setActivity);

	const startTimer = useCallback(() => {
		BackgroundTimer.runBackgroundTimer(() => {
			setSecondsPassed((secs: number) => {
				return secs + 1;
			});
		}, 1000);
	}, []);

	const removeLocationUpdates = async () => {
		console.log("Stop location updates");
		await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
	};

	const onButtonPress = useCallback(async () => {
		// Pause activity tracking
		if (timerOn) {
			console.log("🔴 Stopping activity!");
			setDistancePassed((prevState) => ({
				...prevState,
				sections: prevState.sections + 1,
			}));
			setActivity({
				isStopped: true,
				summary: {
					...activity.summary,
					duration: secondsPassed,
					distance: distancePassed.distance,
				},
			});
			setCurrentSpeed(0);
			BackgroundTimer.stopBackgroundTimer();
			await removeLocationUpdates();
		} // Start activity tracking
		else {
			console.log("🟢 Starting activity! ");
			const permissionsGranted = await checkLocationPermissions();
			if (!permissionsGranted) {
				await removeLocationUpdates();
				return;
			}
			setActivity({
				isStopped: false,
				// Save the start time if it's not present
				...(activity.summary.startTime === 0
					? {
							summary: { ...activity.summary, startTime: new Date().getTime() },
						}
					: {}),
			});
			startTimer();
			await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
				accuracy: Location.Accuracy.Highest,
				foregroundService: {
					notificationTitle: "A notification!",
					notificationBody: "Body",
				},
			});
		}
		setTimerOn((prevState) => !prevState);
	}, [timerOn, secondsPassed, distancePassed]);

	useEffect(() => {
		const { locations } = activity;
		if (locations.length === 0) {
			setSecondsPassed(0);
			setTimerOn(false);
			setDistancePassed({ distance: 0, sections: 0 });
			setCurrentSpeed(0);
			setCurrentAltitude(0);
			return;
		}
		if (locations.length > 0) {
			const { speed, altitude } = locations[locations.length - 1];
			if (typeof speed === "number") setCurrentSpeed(getKmph(speed));
			if (typeof altitude === "number") setCurrentAltitude(getKmph(altitude));
		}
		if (locations.length < 2) return;
		let distance = 0;
		let sections = 0;
		const newLocations = [...locations];
		// Discard the locations that we've already counted
		newLocations.splice(0, distancePassed.sections);
		newLocations.forEach((loc, index) => {
			if (index < newLocations.length - 1) {
				sections += 1;
				const nextLoc = newLocations[index + 1];
				const dist = getPreciseDistance(getCoords(loc), getCoords(nextLoc));
				distance += dist;
			}
		});
		console.log(`Passed distance ${distance / 1000} km`);
		setDistancePassed((prevState) => ({
			distance: prevState.distance + distance,
			sections: prevState.sections + sections,
		}));
	}, [activity.locations]);

	const currentClock = getTime(secondsPassed);

	return (
		<View style={styles.container}>
			<DataGrid
				time={currentClock}
				distance={distancePassed.distance}
				speed={currentSpeed}
				altitude={currentAltitude}
			/>
			<View style={styles.buttonContainer}>
				<PlayButton onPress={onButtonPress} activityInProgress={timerOn} />
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 1,
		width: "100%",
		backgroundColor: "#000",
	},
	time: {
		fontSize: 30,
		color: "#fff",
		textAlign: "center",
	},
	buttonContainer: {
		padding: 15,
	},
});

export default Activity;
