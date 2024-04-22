import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
	date: string;
}

const FinishedActivityHeader = ({ date }: Props) => {
	return (
		<View style={styles.container}>
			<Text style={styles.header}>{date}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#0000",
		width: "100%",
	},
	header: {
		fontSize: 18,
		textAlign: "center",
		fontWeight: "bold",
		color: "#ffff",
	},
});

export default FinishedActivityHeader;
