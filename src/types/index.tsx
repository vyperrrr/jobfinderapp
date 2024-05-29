export type Job = {
  id: number;
  company: string;
  position: string;
  description: string;
  salaryFrom: number;
  salaryTo: number;
  type: string;
  city: string;
  homeOffice: boolean;
};

export type User = {
  id: number;
  email: string;
  fullname: string;
  role: "company" | "jobseeker";
};

export type Experience = {
  id: number;
  company: string;
  title: string;
  interval: string;
};
