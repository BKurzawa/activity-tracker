import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {
	distance: number;
	speed: number;
	time: {
		mins: string;
		hours: string;
		secs: string;
	};
	altitude: number;
}

const DataGrid = ({ time, distance, speed, altitude }: Props) => {
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View style={styles.item}>
					<Text style={styles.header}>Time</Text>
					<Text style={styles.value}>
						{time.hours}:{time.mins}:{time.secs}
					</Text>
				</View>
				<View style={styles.separator} />
				<View style={styles.item}>
					<Text style={styles.header}>Distance</Text>
					<Text style={styles.value}>{(distance / 1000).toFixed(2)} km</Text>
				</View>
			</View>
			<View style={styles.row}>
				<View style={styles.item}>
					<Text style={styles.header}>Altitude</Text>
					<Text style={styles.value}>{altitude.toFixed(2)} m</Text>
				</View>
				<View style={styles.separator} />
				<View style={styles.item}>
					<Text style={styles.header}>Speed</Text>
					<Text style={styles.value}>{speed.toFixed(2)} km/h</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexShrink: 1,
		flexDirection: "column",
		width: "80%",
	},
	row: {
		paddingTop: 10,
		flexDirection: "row",
		width: "100%",
		justifyContent: "center",
	},
	item: {
		flex: 1,
		justifyContent: "space-between",
	},
	separator: {
		height: "50%",
		width: 2,
		backgroundColor: "#72a3f2",
		alignSelf: "center",
	},
	header: {
		fontSize: 18,
		color: "#72a3f2",
		textAlign: "center",
		paddingBottom: 3,
	},
	value: {
		fontSize: 20,
		color: "#fff",
		textAlign: "center",
	},
	buttonsContainer: {
		flexDirection: "row",
	},
	button: {
		padding: 5,
	},
});

export default DataGrid;
