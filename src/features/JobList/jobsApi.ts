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

type Filters = {
  salaryFrom: number;
  salaryTo: number;
  type: "part-time" | "full-time" | "internship";
  city: string;
  homeOffice: boolean;
};

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/" }),
  endpoints: (builder) => ({
    getJobs: builder.query<Jobs, Partial<Filters>>({
      query: (filters) => {
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
          if (value) params.append(key, value.toString());
        });
        return `jobs?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
