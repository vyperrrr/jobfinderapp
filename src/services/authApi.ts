import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Credentials = {
  email: string;
  password: string;
};

type User = {
  id: string;
  email: string;
  fullname: string;
  role: "company" | "jobseeker";
};

type LoginResponse = {
  accessToken: string;
  user: User;
};

type RegisterResponse = User;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, Credentials>({
      query: (credentials: { email: string; password: string }) => ({
        url: "authentication",
        method: "POST",
        body: { ...credentials, strategy: "local" },
      }),
    }),
    registerUser: builder.mutation<RegisterResponse, Credentials>({
      query: (credentials: { email: string; password: string }) => ({
        url: "register",
        method: "POST",
        body: { ...credentials, strategy: "local" },
      }),
    }),
  }),
});

export const { useLoginUserMutation, useRegisterUserMutation } = authApi;
