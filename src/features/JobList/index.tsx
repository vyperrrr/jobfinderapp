import JobPanel from "../../components/JobPanel";
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

const JobList: React.FC = () => {
  const { data, isError, isLoading } = useGetJobsQuery();

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
