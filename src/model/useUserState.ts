import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface AuthStore {
  user: User | null;

  isAuth: boolean;
  token: string | null;
  setUser: (user: User) => void;

  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useUserState = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,

      isAuth: false,
      token: null,
      setUser: (user) => {
        set({ user, isAuth: true });
      },
      login: async (email, password) => {
        try {
          console.log(`email: ${email}, password: ${password}`);
          set({ isAuth: true });
        } catch (error) {
          console.error("Login failed: ", error);
        }
      },
      logout: () => {
        set({ user: null, isAuth: false, token: null });
      },
    }),
    { name: "user-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
