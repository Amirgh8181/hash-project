import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the interface of the Cart state
interface State {
    loginSaltShow: string,
    loginChallengeShow: string,
    loginEmailShow: string,
    setLoginSalt: (arg: string) => void;
    setLoginChallenge: (arg: string) => void;
    setLoginEmail: (arg: string) => void;
}


// Create the store with Zustand, combining the status interface and actions
export const useLogin = create<State>()(
    persist(
        (set) => ({
            loginSaltShow: "",
            loginChallengeShow: "",
            loginEmailShow: "",
            setLoginSalt: (arg) => set({ loginSaltShow: arg }),
            setLoginChallenge: (arg) => set({ loginChallengeShow: arg }),
            setLoginEmail: (arg) => set({ loginEmailShow: arg }),
        }),
        {
            name: "Login"
        }
    )
)





