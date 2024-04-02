import { create } from "zustand";

const useStore = create((set) => ({
    totalCartUpdate: 0,
    triggerTotalCartUpdate: () =>
      set((state) => {
        console.log(`Updating totalCartUpdate from ${state.totalCartUpdate} to ${state.totalCartUpdate + 1}`);
        return { totalCartUpdate: state.totalCartUpdate + 1 };
      }),
  }));

export default useStore;
a