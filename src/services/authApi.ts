import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type User = {
  id: string;
  email: string;
  fullname: string;
  role: "company" | "jobseeker";
};

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

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/" }),
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
