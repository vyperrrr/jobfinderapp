import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

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

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:3030" }),
  endpoints: (builder) => ({
    getJobs: builder.query<Job, void>({
      query: () => "/jobs",
    }),
  }),
});
