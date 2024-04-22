import AsyncStorage from "@react-native-async-storage/async-storage";

const getActivities = async () => {
	try {
		//await AsyncStorage.removeItem("@activities"); // DEV Only: Uncomment to clear the storage
		const jsonValue = await AsyncStorage.getItem("@activities");
		const activitiesArr = jsonValue != null ? JSON.parse(jsonValue) : [];
		return activitiesArr;
	} catch (e) {
		console.log("Error getting activities", e);
	}
	return [];
};

export default getActivities;
