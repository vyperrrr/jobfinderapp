import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";

type User = {
  id: string;
  email: string;
  fullname: string;
  role: "company" | "jobseeker";
};

interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  initialState: initialState,
  name: "auth",
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      const { user, token } = action.payload;
      localStorage.setItem("authenticated", JSON.stringify({ user, token }));
      state.user = user;
      state.token = token;
    },
    logout: (state) => {
      localStorage.removeItem("authenticated");
      state.user = null;
      state.token = null;
    },
  },
});

export const getUser = (state: RootState) => state.auth.user;

export const getToken = (state: RootState) => state.auth.token;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
