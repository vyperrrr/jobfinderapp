import { apiSlice } from "../app/api/apiSlice";
import { Job, User } from "../types";

interface ApplyResponse {
  userId: number;
  jobId: number;
  user: User;
  job: Job;
}

export const applicantsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyForJob: builder.mutation<ApplyResponse, { jobId: number }>({
      query: (body) => {
        return {
          url: `applicants`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useApplyForJobMutation } = applicantsApi;
