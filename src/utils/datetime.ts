const displayTime = (timestamp: number) => {
	const date = new Date(timestamp).toLocaleDateString();
	const time = new Date(timestamp).toLocaleTimeString();
	return `${date}, ${time}`;
};

const getTime = (secondsPassed: number) => {
	const h = Math.floor(secondsPassed / 60 / 60);
	const m = Math.floor((secondsPassed / 60) % 60);
	const s = Math.floor(secondsPassed % 60);
	const hours = h < 10 ? `0${h}` : `${h}`;
	const mins = m < 10 ? `0${m}` : `${m}`;
	const secs = s < 10 ? `0${s}` : `${s}`;
	return {
		hours,
		mins,
		secs,
	};
};

export { displayTime, getTime };
