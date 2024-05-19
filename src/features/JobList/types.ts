import { Job } from "../../types";

export type Jobs = {
  total: number;
  limit: number;
  skip: number;
  data: [Job];
};

export type JobsQueryParams = {
  company: string;
  salaryFrom: number;
  salaryTo: number;
  type: "part-time" | "full-time" | "internship";
  city: string;
  homeOffice: boolean;
};

export type JobQueryParams = {
  id: string;
};

export type Filters = {
  salaryFrom: number;
  salaryTo: number;
  type: "part-time" | "full-time" | "internship";
  city: string;
  homeOffice: boolean;
};
