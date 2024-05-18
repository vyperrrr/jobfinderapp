import { Job } from "../types";

const JobListItem: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div>
      <h1>{JSON.stringify(job)}</h1>
    </div>
  );
};

export default JobListItem;
