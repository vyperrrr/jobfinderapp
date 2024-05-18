import JobPanel from "../../components/JobPanel";

import { useSearchParams } from "react-router-dom";
import { useGetJobsQuery } from "./jobsApi";

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

type Filters = {
  salaryFrom: number;
  salaryTo: number;
  type: "part-time" | "full-time" | "internship";
  city: string;
  homeOffice: boolean;
};

const JobList: React.FC = () => {
  const [searchParams] = useSearchParams();

  const filters: Filters = JSON.parse(searchParams.get("filters") ?? "{}");

  const { data, isError, isLoading } = useGetJobsQuery(filters);

  if (isError) {
    return <div>An error occurred...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <div>
      {data?.data.map((job: Job) => {
        return <JobPanel key={job.id} job={job} />;
      })}
    </div>
  );
};

export default JobList;
