import { apiSlice } from "../app/api/apiSlice";

import { User } from "../types";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetUserByIdQuery } = usersApi;
