import { create } from "zustand";

export interface ILocation {
	latitude: number;
	longitude: number;
	speed: number | null;
	altitude: number | null;
	timestamp: number;
}
export interface IActivity {
	locations: ILocation[];
	summary: {
		startTime: number;
		distance: number;
		duration: number;
	};
	isStopped: boolean;
	isFinished: boolean;
}

export interface ActivityState {
	activity: IActivity;
	setActivity: (activity: Partial<IActivity>) => void;
	resetActivity: () => void;
}

export const initActivity = {
	locations: [],
	summary: { duration: 0, distance: 0, startTime: 0 },
	isStopped: true,
	isFinished: false,
};

export const useActivityStore = create<ActivityState>((set) => ({
	activity: initActivity,
	setActivity: (newActivity) =>
		set((state) => ({ activity: { ...state.activity, ...newActivity } })),
	resetActivity: () => set(() => ({ activity: initActivity })),
}));
