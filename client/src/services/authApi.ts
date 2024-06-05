import { apiSlice } from "../app/api/apiSlice";

import { User } from "../types";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  user: User;
}

interface RegisterPayload {
  email: string;
  password: string;
  fullname: string;
  role: "company" | "jobseeker";
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, LoginPayload>({
      query: (credentials) => ({
        url: "authentication",
        method: "POST",
        body: { ...credentials, strategy: "local" },
      }),
    }),
    registerUser: builder.mutation<User, RegisterPayload>({
      query: (credentials) => {
        return {
          url: "users",
          method: "POST",
          body: credentials,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
