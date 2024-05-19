import JobPanel from "../../components/JobPanel";

import { useSearchParams } from "react-router-dom";
import { useGetJobsQuery } from "./jobsApi";

import { Job } from "../../types";
import { Filters } from "./types";
import { Section } from "@radix-ui/themes";

const JobList: React.FC = () => {
  const [searchParams] = useSearchParams();

  const search: string = searchParams.get("search") ?? "";
  const filters: Filters = JSON.parse(searchParams.get("filters") ?? "{}");

  const { data, isError, isLoading } = useGetJobsQuery({
    company: search,
    ...filters,
  });

  if (isError) {
    return <div>An error occurred...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <Section className="space-y-2">
      {data?.data.map((job: Job) => {
        return <JobPanel key={job.id} job={job} />;
      })}
    </Section>
  );
};

export default JobList;
