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
    applyForJob: builder.mutation<ApplyResponse, { id?: number }>({
      query: (payload) => {
        return {
          url: `applicants`,
          method: "POST",
          body: { jobId: payload.id },
        };
      },
    }),
    getJobApplicants: builder.query<ApplyResponse[], { id?: number }>({
      query: (payload) => `applicants?jobId=${payload.id}`,
    }),
    removeJobApplicant: builder.mutation<
      { userId: number; jobId: number },
      number
    >({
      query: (jobId) => ({
        url: `applicants/jobId=${jobId}`,
        method: "DELETE",
      }),
    }),
    getJobsForApplicant: builder.query<ApplyResponse[], number>({
      query: (userId) => `applicants/userId=${userId}`,
    }),
  }),
});

export const {
  useApplyForJobMutation,
  useGetJobApplicantsQuery,
  useRemoveJobApplicantMutation,
  useGetJobsForApplicantQuery,
} = applicantsApi;
