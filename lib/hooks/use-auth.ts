"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserRole } from "@/lib/types/auth";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
    }
  )
);