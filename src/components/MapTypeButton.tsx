import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { MAP_TYPES, MapType } from "react-native-maps";
import {
	Menu,
	MenuOption,
	MenuOptions,
	MenuTrigger,
} from "react-native-popup-menu";

import { MaterialIcons } from "@expo/vector-icons";

interface Props {
	handleSetMapType: any;
	mapType: MapType;
}

const MapTypeButton = ({ handleSetMapType, mapType }: Props) => {
	const TriggerComponent = (props: any) => {
		return (
			<View style={styles.container}>
				<TouchableHighlight
					onPress={props.onPress}
					style={styles.button}
					underlayColor="#555">
					<MaterialIcons name="layers" size={24} color="black" />
				</TouchableHighlight>
			</View>
		);
	};
	return (
		<Menu onSelect={(value) => handleSetMapType(value)}>
			<MenuTrigger
				customStyles={{
					TriggerTouchableComponent: TriggerComponent,
				}}
			/>
			<MenuOptions optionsContainerStyle={{ width: 100 }}>
				<MenuOption
					value={MAP_TYPES.STANDARD}
					disabled={mapType === MAP_TYPES.STANDARD}
					text="Standard"
				/>
				<MenuOption
					value={MAP_TYPES.SATELLITE}
					disabled={mapType === MAP_TYPES.SATELLITE}
					text="Satelite"
				/>
				<MenuOption
					value={MAP_TYPES.HYBRID}
					disabled={mapType === MAP_TYPES.HYBRID}
					text="Hybrid"
				/>
			</MenuOptions>
		</Menu>
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

export default MapTypeButton;
