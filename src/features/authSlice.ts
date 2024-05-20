import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    name: string | null;
    token: string | null;
  };
}

const initialState: AuthState = {
  user: {
    name: null,
    token: null,
  },
};

const authSlice = createSlice({
  initialState: initialState,
  name: "auth",
  reducers: {
    login: (state, action) => {
      const { name, token } = action.payload;
      localStorage.setItem("user", JSON.stringify({ name, token }));
      state.user.name = name;
      state.user.token = token;
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user.name = null;
      state.user.token = null;
    },
  },
});

export const selectUser = (state: AuthState) => state.user;

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
