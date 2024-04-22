import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";

import { Entypo } from "@expo/vector-icons";

interface Props {
	onPress: () => void;
	activityInProgress: boolean;
}

const PlayButton = ({ onPress, activityInProgress }: Props) => {
	return (
		<View style={styles.container}>
			<TouchableHighlight
				onPress={onPress}
				style={{ ...styles.button, paddingLeft: activityInProgress ? 0 : 3 }}
				underlayColor="#555">
				<Entypo
					name={activityInProgress ? "controller-stop" : "controller-play"}
					size={32}
					color="#ffff"
				/>
			</TouchableHighlight>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 50,
		height: 50,
		borderRadius: 50 / 2,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		width: "100%",
		height: "100%",
		backgroundColor: "#72a3f2",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 50 / 2,
	},
});

export default PlayButton;
