import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/lib/types/user";
import type { AuthResponse } from "@/lib/types/auth";

interface UserState {
  currentUser: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  handleAuthResponse: (response: AuthResponse) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      currentUser: null,

      setUser: (user) => set({ currentUser: user }),

      clearUser: () => set({ currentUser: null }),

      handleAuthResponse: (response) => {
        // Save token
        localStorage.setItem("auth_token", response.token);

        // Update user state
        set({ currentUser: response.user });
      },
    }),
    {
      name: "user-storage",
    }
  )
);
