import { ILocation } from "../hooks/activityStore";

interface Points {
	latitude: number;
	longitude: number;
}

// Default values to set the initial zoom level
const defaultLatDelta = 0.0043;
const defaultLnDelta = 0.0034;

// https://github.com/react-native-maps/react-native-maps/issues/505#issuecomment-243423775
const getRegionFromCoordinates = (points: Points[]) => {
	// points should be an array of { latitude: X, longitude: Y }
	let minX: number;
	let maxX: number;
	let minY: number;
	let maxY: number;

	// init first point
	((point) => {
		minX = point.latitude;
		maxX = point.latitude;
		minY = point.longitude;
		maxY = point.longitude;
	})(points[0]);

	// calculate rect
	points.map((point) => {
		minX = Math.min(minX, point.latitude);
		maxX = Math.max(maxX, point.latitude);
		minY = Math.min(minY, point.longitude);
		maxY = Math.max(maxY, point.longitude);
	});

	const midX = (minX + maxX) / 2;
	const midY = (minY + maxY) / 2;
	const deltaX = maxX - minX;
	const deltaY = maxY - minY;

	return {
		latitude: midX,
		longitude: midY,
		latitudeDelta: deltaX || defaultLatDelta,
		longitudeDelta: deltaY || defaultLnDelta,
	};
};

const getKmph = (speed: number) => {
	return (speed * 36) / 10;
};

const getCoords = ({ latitude, longitude }: ILocation) => {
	return { latitude, longitude };
};

export { getCoords, getKmph, getRegionFromCoordinates };
