import { create } from "zustand";

// Attach the store to a global variable to ensure a single instance
window.myGlobalStore =
	window.myGlobalStore ||
	create((set) => ({
		totalCartUpdate: 0,
		triggerTotalCartUpdate: () =>
			set((state) => ({ totalCartUpdate: state.totalCartUpdate + 1 })),
	}));

export default window.myGlobalStore;