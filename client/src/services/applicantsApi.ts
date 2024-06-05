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
    applyForJob: builder.mutation<ApplyResponse, number>({
      query: (id) => {
        return {
          url: `applicants`,
          method: "POST",
          body: { jobId: id },
        };
      },
      invalidatesTags: ["Applicant"],
    }),
    getJobApplicants: builder.query<ApplyResponse[], { id?: number }>({
      query: (payload) => `applicants?jobId=${payload.id}`,
      providesTags: ["Applicant"],
    }),
    removeJobApplicant: builder.mutation<
      { userId: number; jobId: number },
      number
    >({
      query: (jobId) => ({
        url: `applicants?jobId=${jobId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Applicant"],
    }),
    getJobsForApplicant: builder.query<ApplyResponse[], { id?: number }>({
      query: (payload) => `applicants?userId=${payload.id}`,
      providesTags: ["Applicant"],
    }),
  }),
});

export const {
  useApplyForJobMutation,
  useGetJobApplicantsQuery,
  useRemoveJobApplicantMutation,
  useGetJobsForApplicantQuery,
} = applicantsApi;
