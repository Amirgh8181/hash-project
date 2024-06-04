import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface of the Cart state
interface State {
    checkLogin: boolean,
    setCheckLogin: (arg: boolean) => void;
}


// Create the store with Zustand, combining the status interface and actions
export const useCheckLogin = create<State>()(
    persist(
        (set) => ({
            checkLogin: false,
            setCheckLogin: (arg) => set({ checkLogin: arg }),
        }),
        {
            name: "CheckLogin"
        }
    )
)





