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
    getJobs: builder.query<Jobs, Filters>({
      query: ({ salaryFrom, salaryTo, type, city, homeOffice }) => {
        let query = "jobs?";
        if (salaryFrom) query += `salaryFrom[$gt]=${salaryFrom}&`;
        if (salaryTo) query += `salaryTo[$lt]=${salaryTo}&`;
        if (type) query += `type=${type}&`;
        if (city) query += `city=${city}&`;
        if (homeOffice) query += `homeOffice=${homeOffice}&`;
        console.log(query);
        return query.endsWith("&") ? query.slice(0, -1) : query;
      },
    }),
  }),
});

export const { useGetJobsQuery } = jobsApi;
