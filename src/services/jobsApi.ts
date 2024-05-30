import { apiSlice } from "../app/api/apiSlice";

import { Job } from "../types";

interface JobsResponse {
  total: number;
  limit: number;
  skip: number;
  data: [Job];
}

interface JobsPayload {
  company: string;
  salaryFrom: number;
  salaryTo: number;
  type: "part-time" | "full-time" | "internship";
  city: string;
  homeOffice: boolean;
}

export const jobsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<
      JobsResponse,
      Partial<JobsPayload> | { userId?: number }
    >({
      query: (filters) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            switch (key) {
              case "company":
                params.append(key + "[$like]", `%${value}%`);
                break;
              case "salaryFrom":
                params.append(key + "[$gt]", value.toString());
                break;
              case "salaryTo":
                params.append(key + "[$lt]", value.toString());
                break;
              default:
                params.append(key, value.toString());
            }
          }
        });
        return `jobs?${params.toString()}`;
      },
      providesTags: ["Job"],
    }),
    getJob: builder.query<Job, { id?: string }>({
      query: ({ id }) => `jobs/${id}`,
    }),
    getAllJobs: builder.query<JobsResponse, void>({
      query: () => "jobs",
      providesTags: ["Job"],
    }),
    deleteJob: builder.mutation<void, number>({
      query: (id) => ({
        url: `jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Job"],
    }),
    createJob: builder.mutation<Job, Omit<Job, "id">>({
      query: (payload) => ({
        url: "jobs",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Job"],
    }),
    editJob: builder.mutation<Job, { id: number; data: Job }>({
      query: (payload) => {
        return {
          url: `jobs/${payload.id}`,
          method: "PATCH",
          body: payload.data,
        };
      },
      invalidatesTags: ["Job"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobQuery,
  useGetAllJobsQuery,
  useDeleteJobMutation,
  useCreateJobMutation,
  useEditJobMutation,
} = jobsApi;
