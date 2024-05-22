import { apiSlice } from "../app/api/apiSlice";

import { User } from "../types";

export type LoginParams = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
  user: User;
};

export type RegisterParams = {
  email: string;
  password: string;
  fullname: string;
  role: "company" | "jobseeker";
};

type RegisterResponse = User;

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, LoginParams>({
      query: (credentials) => ({
        url: "authentication",
        method: "POST",
        body: { ...credentials, strategy: "local" },
      }),
    }),
    registerUser: builder.mutation<RegisterResponse, RegisterParams>({
      query: (credentials) => {
        console.log(credentials);
        return {
          url: "users",
          method: "POST",
          body: { ...credentials },
        };
      },
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
