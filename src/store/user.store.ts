import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface AuthState {
    accessToken: string;
    role: string;
    setAccessToken: (token: string) => void;
    removeToken: () => void;
}

export const useAuthStore = create<AuthState>()(
    persist((set) => ({
        accessToken: "",
        role: "",
        setAccessToken: (token) => {
            // Decode token to get role
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                set(() => ({ accessToken: token, role: payload.role || 'user' }));
            } catch {
                set(() => ({ accessToken: token, role: 'user' }));
            }
        },
        removeToken: () => set(() => ({ accessToken: "" })),
    }), {
        name: "auth-storage",
    })
);
