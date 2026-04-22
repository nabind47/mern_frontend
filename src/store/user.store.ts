import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface AuthState {
    accessToken: string;
    setAccessToken: (token: string) => void;
    removeToken: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        accessToken: "",
        setAccessToken: (token) => set(() => ({ accessToken: token })),
        removeToken: () => set(() => ({ accessToken: "" })),
    }), {
        name: "auth-storage",
    })
);
