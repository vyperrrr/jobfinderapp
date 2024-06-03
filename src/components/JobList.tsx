import JobPanel from "./JobPanel";

import { useSearchParams } from "react-router-dom";
import { useGetJobsQuery } from "../services/jobsApi";

import { Job } from "../types";

interface Filters {
  salaryFrom: number;
  salaryTo: number;
  type: "part-time" | "full-time" | "internship";
  city: string;
  homeOffice: boolean;
}

const JobList: React.FC = () => {
  const [searchParams] = useSearchParams();

  const search: string = searchParams.get("search") ?? "";
  const filters: Filters = JSON.parse(searchParams.get("filters") ?? "{}");

  const { data, isError, isLoading } = useGetJobsQuery({
    company: search,
    ...filters,
  });

  const jobs = data?.data;

  if (isError) {
    return <div>Hiba történt...</div>;
  }

  if (isLoading) {
    return <div>Állások betöltése...</div>;
  }

  return (
    <div>
      <span className="space-y-6">
        {jobs && jobs.length > 0 ? (
          jobs.map((job: Job) => {
            return <JobPanel key={job.id} job={job} />;
          })
        ) : (
          <p>Egy álláshirdetés sem áll rendelkezésre...</p>
        )}
      </span>
    </div>
  );
};

export default JobList;
