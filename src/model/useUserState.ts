import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface User {
  id: number;
  name: string;
  surname: string;
  dateOfBirth: string;
  phone: string;
  email: string;
}

export interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  resetUser: () => void;
}

export const useUserState = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
      },
      resetUser: () => {
        set({ user: null });
      },
    }),
    { name: "user-storage", storage: createJSONStorage(() => localStorage) },
  ),
);
