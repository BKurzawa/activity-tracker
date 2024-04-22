import AsyncStorage from "@react-native-async-storage/async-storage";

import { IActivity } from "../../hooks/activityStore";

const saveActivity = async (activity: IActivity) => {
	try {
		const jsonValue = await AsyncStorage.getItem("@activities");
		const activitiesArr = jsonValue != null ? JSON.parse(jsonValue) : [];
		activitiesArr.push(activity);
		await AsyncStorage.setItem("@activities", JSON.stringify(activitiesArr));
		console.log("Activity saved");
	} catch (e) {
		console.log("Error saving activity", e);
	}
};

export default saveActivity;
