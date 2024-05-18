import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Job = {
  id: number;
  company: string;
  position: string;
  description: string;
  salaryFrom: number;
  salaryTo: number;
  type: string;
  city: string;
  homeOffice: boolean;
  userId: number;
};

type Jobs = {
  total: number;
  limit: number;
  skip: number;
  data: [Job];
};

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/" }),
  endpoints: (builder) => ({
    getJobs: builder.query<Jobs, void>({
      query: () => "jobs",
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
