import AsyncStorage from "@react-native-async-storage/async-storage";

import { IActivity } from "../../hooks/activityStore";

const removeActivity = async (activity: IActivity) => {
	try {
		const timestampToRemove = activity.locations[0].timestamp;
		const jsonValue = await AsyncStorage.getItem("@activities");
		const activitiesArr: [IActivity] =
			jsonValue != null ? JSON.parse(jsonValue) : [];
		const filteredArr = activitiesArr.filter(
			({ locations }) => locations[0].timestamp !== timestampToRemove,
		);
		await AsyncStorage.setItem("@activities", JSON.stringify(filteredArr));
		console.log(`Activity ${timestampToRemove} removed`);
	} catch (e) {
		console.log("Error removing activity", e);
	}
};

export default removeActivity;
