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

type QueryParams = {
  company: string;
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
    getJobs: builder.query<Jobs, Partial<QueryParams>>({
      query: (filters) => {
        let queryString = "";
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            switch (key) {
              case "company":
                queryString += `${key}[$like]=%${value}%&`;
                break;
              case "salaryFrom":
                queryString += `${key}[$gt]=${value}&`;
                break;
              case "salaryTo":
                queryString += `${key}[$lt]=${value}&`;
                break;
              default:
                queryString += `${key}=${value}&`;
            }
          }
        });
        console.log(queryString);
        queryString = queryString.slice(0, -1);
        return `jobs?${queryString}`;
      },
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
