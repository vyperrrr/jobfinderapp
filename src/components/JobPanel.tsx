import { Job } from "../types";
import { formatSalary } from "../utils";

const JobListItem: React.FC<{ job: Job }> = ({ job }) => {
  const salaryFormatted =
    formatSalary(job.salaryFrom) + " - " + formatSalary(job.salaryTo);

  return (
    <div className="w-100 flex h-40 items-center justify-between border-b-2 border-gray-400 bg-gray-50 px-4 text-gray-800 hover:bg-gray-200">
      <span>
        <p className="text-lg font-semibold">{job.position}</p>
        <p className="text-md underline">{job.city}</p>
      </span>
      <span>
        <p className="text-lg font-semibold">{salaryFormatted}</p>
        <p className="float-end text-sm">{job.type}</p>
      </span>
    </div>
  );
};

export default JobListItem;
