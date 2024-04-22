import { Alert } from "react-native";
import * as Location from "expo-location";

const checkLocationPermissions = async () => {
	const { status: foregroundStatus, canAskAgain: foregroundCanAskAgain } =
		await Location.requestForegroundPermissionsAsync();

	const alert = {
		title: "🌏 Access to location required",
		message:
			"Please allow the app to use background location in order to start tracking your activity.",
	};

	if (foregroundStatus !== "granted") {
		if (!foregroundCanAskAgain) {
			Alert.alert(alert.title, alert.message);
		}
		return false;
	}

	const { status, canAskAgain } =
		await Location.requestBackgroundPermissionsAsync();

	if (status !== "granted") {
		if (!canAskAgain) {
			Alert.alert(alert.title, alert.message);
		}
		return false;
	}

	return true;
};

export { checkLocationPermissions };
