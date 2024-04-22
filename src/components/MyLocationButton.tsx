import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

const MyLocationButton = ({ onPress }: any) => {
	return (
		<View style={styles.container}>
			<TouchableHighlight
				onPress={onPress}
				style={styles.button}
				underlayColor="#555">
				<MaterialIcons name="my-location" size={24} color="black" />
			</TouchableHighlight>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 38,
		height: 38,
		backgroundColor: "#ffff",
		borderRadius: 38 / 2,
		opacity: 0.5,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: "100%",
		height: "100%",
		backgroundColor: "#ffff",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 38 / 2,
	},
});

export default MyLocationButton;
