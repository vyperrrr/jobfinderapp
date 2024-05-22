import { apiSlice } from "../app/api/apiSlice";

import { Job } from "../types";

export type Jobs = {
  total: number;
  limit: number;
  skip: number;
  data: [Job];
};

type JobsParams = {
  company: string;
  salaryFrom: number;
  salaryTo: number;
  type: "part-time" | "full-time" | "internship";
  city: string;
  homeOffice: boolean;
};

type JobParams = {
  id: string;
};

export const jobsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query<Jobs, Partial<JobsParams>>({
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
    }),
    getJob: builder.query<Job, Partial<JobParams>>({
      query: ({ id }) => `jobs/${id}`,
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
export const { useGetJobQuery } = jobsApi;
