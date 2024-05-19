import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Job } from "../../types";
import { Jobs, JobsQueryParams, JobQueryParams } from "./types";

export const jobsApi = createApi({
  reducerPath: "jobsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3030/" }),
  endpoints: (builder) => ({
    getJobs: builder.query<Jobs, Partial<JobsQueryParams>>({
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
    getJob: builder.query<Job, Partial<JobQueryParams>>({
      query: ({ id }) => `jobs/${id}`,
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
export const { useGetJobQuery } = jobsApi;
