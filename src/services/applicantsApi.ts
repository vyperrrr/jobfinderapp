import { apiSlice } from "../app/api/apiSlice";

export const applicantsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyForJob: builder.mutation<void, void>({
      query: (body) => ({
        url: `applicants`,
        method: "POST",
        body: body.userId,
      }),
    }),
  }),
});

export const { useApplyForJobMutation } = applicantsApi;
