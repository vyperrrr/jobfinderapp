import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type User = {
  id: number;
  email: string;
  fullname: string;
  role: "company" | "jobseeker";
};

interface AuthState {
  user: User | null;
  token: string | null;
}

const preloadedState = () => {
  const userData = localStorage.getItem("userData");
  if (userData) {
    return JSON.parse(userData);
  }
  return {
    user: null,
    token: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: preloadedState() as AuthState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      localStorage.setItem("userData", JSON.stringify({ user, token }));
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      localStorage.removeItem("userData");
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

export const getUser = (state: RootState) => state.auth.user;
export const getToken = (state: RootState) => state.auth.token;
