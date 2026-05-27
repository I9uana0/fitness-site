import { AuthStore } from "./useUserState";

export const selectIsAuth = (state: AuthStore) => state.isAuth;
export const selectLogin = (state: AuthStore) => state.login;
export const selectLogout = (state: AuthStore) => state.logout;
