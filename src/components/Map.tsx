import React, { useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import * as Location from "expo-location";
import MapView, {
	MAP_TYPES,
	MapType,
	Polyline,
	PROVIDER_GOOGLE,
} from "react-native-maps";

import { ILocation } from "../hooks/activityStore";
import { getRegionFromCoordinates } from "../utils/geo";
import { checkLocationPermissions } from "../utils/permissions";

import MapTypeButton from "./MapTypeButton";
import MyLocationButton from "./MyLocationButton";

type Nullable<T> = T | null;

interface Props {
	locations: ILocation[];
	isActivityFinished: boolean;
}

interface Region {
	latitude: number;
	longitude: number;
	latitudeDelta: number;
	longitudeDelta: number;
}

const Map = ({ locations, isActivityFinished }: Props) => {
	const [mapType, setMapType] = useState<MapType>(MAP_TYPES.STANDARD);
	const mapRef = useRef<MapView>(null);

	const handleMapInit = async () => {
		let region: Nullable<Region> = null;
		const permissionsGranted = await checkLocationPermissions();
		if (!permissionsGranted) return;
		// Activity in progress - calculate region for current location
		if (!isActivityFinished) {
			const location = await Location.getCurrentPositionAsync();
			const {
				coords: { latitude, longitude },
			} = location;
			region = getRegionFromCoordinates([{ latitude, longitude }]);
		}
		// Activity finished - calculate region to match saved route
		else if (locations?.length) {
			const coordsArr = locations.map((el) => ({
				latitude: el.latitude,
				longitude: el.longitude,
			}));
			region = getRegionFromCoordinates(coordsArr);
		}
		if (region) mapRef?.current?.animateToRegion(region);
	};

	const routeCoordinates = useMemo(() => {
		return Array.isArray(locations)
			? locations.map(({ latitude, longitude }: ILocation) => {
					return {
						latitude,
						longitude,
					};
				})
			: [];
	}, [locations]);

	const handleShowMyLocation = async () => {
		if (!mapRef.current) return;
		const location = await Location.getLastKnownPositionAsync();
		if (!location) return;
		const camera = await mapRef.current.getCamera();
		camera.center.latitude = location.coords.latitude;
		camera.center.longitude = location.coords.longitude;
		mapRef.current.animateCamera(camera, { duration: 100 });
	};

	const handleSetMapType = (type: MapType) => {
		setMapType(type);
	};

	return (
		<View style={{ flex: 1 }}>
			<MapView
				ref={mapRef}
				style={{
					width: Dimensions.get("screen").width,
					flex: 1,
				}}
				showsUserLocation
				showsMyLocationButton={false}
				onMapReady={handleMapInit}
				mapType={mapType}
				provider={PROVIDER_GOOGLE}
				zoomControlEnabled>
				<Polyline
					coordinates={routeCoordinates}
					strokeColor="#4287f5"
					strokeWidth={6}
					zIndex={1}
				/>
			</MapView>
			<View style={{ position: "absolute", top: 5, right: 5 }}>
				<View style={styles.button}>
					<MyLocationButton onPress={handleShowMyLocation} />
				</View>
				<View style={styles.button}>
					<MapTypeButton
						handleSetMapType={handleSetMapType}
						mapType={mapType}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		paddingBottom: 5,
	},
});

export default Map;
