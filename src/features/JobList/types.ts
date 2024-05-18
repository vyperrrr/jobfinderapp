import { Job } from "../../types";

export type Jobs = {
  total: number;
  limit: number;
  skip: number;
  data: [Job];
};

export type QueryParams = {
  company: string;
  salaryFrom: number;
  salaryTo: number;
  type: "part-time" | "full-time" | "internship";
  city: string;
  homeOffice: boolean;
};

export type Filters = {
  salaryFrom: number;
  salaryTo: number;
  type: "part-time" | "full-time" | "internship";
  city: string;
  homeOffice: boolean;
};
