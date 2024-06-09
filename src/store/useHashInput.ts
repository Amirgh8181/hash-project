import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface of the Cart state
interface State {
    userHashMessage: string,
    setUserHashMessage: (arg: string) => void;
}


// Create the store with Zustand, combining the status interface and actions
export const useHashInput = create<State>()(
    persist(
        (set) => ({
            userHashMessage: "",
            setUserHashMessage: (arg) => set({ userHashMessage: arg }),
        }),
        {
            name: "CheckLogin"
        }
    )
)
