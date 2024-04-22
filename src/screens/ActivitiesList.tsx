import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../App";
import ListItem from "../components/ListItem";
import { IActivity } from "../hooks/activityStore";
import getActivities from "../utils/storage/getActivities";
import removeActivity from "../utils/storage/removeActivity";

type ActivitiesListNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Activities"
>;

type Props = {
	navigation: ActivitiesListNavigationProp;
};

const ActivitiesList = ({ navigation }: Props) => {
	const [activities, setActivities] = useState<IActivity[]>([]);

	useFocusEffect(
		React.useCallback(() => {
			let isActive = true;
			const fetchActivities = async () => {
				try {
					const activities = await getActivities();
					if (isActive) {
						setActivities(activities);
					}
				} catch (e) {
					console.log(e);
				}
			};
			fetchActivities();
			return () => {
				isActive = false;
			};
		}, []),
	);

	const handlePress = (activity: IActivity) => {
		navigation.navigate("Activity Details", { activity });
	};

	const handleDelete = (activity: IActivity) => {
		const filteredActivities = activities.filter(
			({ locations }) =>
				locations[0].timestamp !== activity.locations[0].timestamp,
		);
		setActivities(filteredActivities);
		removeActivity(activity);
	};

	const renderItem = ({ item }: { item: IActivity }) => (
		<ListItem
			activity={item}
			handlePress={handlePress}
			handleDelete={handleDelete}
		/>
	);

	return activities.length ? (
		<FlatList
			data={activities}
			renderItem={renderItem}
			keyExtractor={(item) => item.locations[0].timestamp.toString()}
		/>
	) : null;
};

export default ActivitiesList;
