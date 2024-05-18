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

const JobListItem: React.FC<{ job: Job }> = ({ job }) => {
  return (
    <div>
      <h1>{JSON.stringify(job)}</h1>
    </div>
  );
};

export default JobListItem;
