import { User } from "../types";

interface ApplicantsPanelProps {
  applicant: User;
}

const ApplicantsPanel: React.FC<ApplicantsPanelProps> = ({ applicant }) => {
  return (
    <li className="rounded-md bg-slate-700 p-4">
      <span className="flex items-center justify-between">
        <ul className="flex flex-col">
          <li>
            <p className="font-semibold">{applicant.fullname}</p>
          </li>
          <li className="text-xs">{applicant.email}</li>
        </ul>
      </span>
    </li>
  );
};

export default ApplicantsPanel;
