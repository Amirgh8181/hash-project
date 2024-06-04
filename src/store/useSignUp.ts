import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface of the Cart state
interface State {
    signUpSaltShow: string,
    signUpEmail: string,
    setSignUpSalt: (arg: string) => void;
    setSignUpEmail: (arg: string) => void;
}


// Create the store with Zustand, combining the status interface and actions
export const useSignUp = create<State>()(
    persist(
        (set) => ({
            signUpSaltShow: "",
            signUpEmail: "",
            setSignUpSalt: (arg) => set({ signUpSaltShow: arg }),
            setSignUpEmail: (arg) => set({ signUpEmail: arg }),
        }),
        {
            name: "SignUp"
        }
    )
)
