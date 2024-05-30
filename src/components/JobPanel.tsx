import { useNavigate } from "react-router-dom";
import { Job } from "../types";

import { Button } from "@radix-ui/themes";
import { Badge } from "@radix-ui/themes";

import {
  BackpackIcon,
  SewingPinIcon,
  TimerIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { CiBadgeDollar } from "react-icons/ci";

import { prettyPrint } from "../utils";

const JobListItem: React.FC<{ job: Job }> = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-40 items-center justify-between rounded-md  border-b-8 border-l-4 border-l-slate-300 bg-slate-50 px-8 shadow-md dark:bg-slate-800 dark:text-slate-50">
      <span className="flex flex-col items-start gap-y-4">
        <span className="flex items-center gap-x-2">
          <h2 className="text-2xl font-semibold ">{job.position}</h2>
          <Badge color="green">{job.homeOffice ? "Remote" : "On-site"}</Badge>
        </span>
        <ul className="flex gap-x-2 [&>li]:flex [&>li]:items-center [&>li]:gap-x-2">
          <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
            <BackpackIcon className="h-4 w-4 text-emerald-400" />
            <p className="text-xs font-semibold">{job.company}</p>
          </li>
          <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
            <TimerIcon className="h-4 w-4 text-emerald-400" />
            <p className="text-xs font-semibold">{job.type}</p>
          </li>
          <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
            <SewingPinIcon className="h-4 w-4 text-emerald-400" />
            <p className="text-xs font-semibold">{job.city}</p>
          </li>
        </ul>
      </span>
      <span className="flex flex-col items-end gap-y-4">
        <ul className="flex [&>li]:flex [&>li]:items-center [&>li]:gap-x-2">
          <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
            <CiBadgeDollar className="h-8 w-8 text-emerald-400" />
            <p className="font-semibold">
              {prettyPrint(job.salaryFrom)
                .concat(" - ")
                .concat(prettyPrint(job.salaryTo))}
            </p>
          </li>
        </ul>
        <ul className="flex gap-x-4">
          <li>
            <Button variant="soft" onClick={() => navigate(`/jobs/${job.id}`)}>
              <p>Részletek</p>
              <DoubleArrowRightIcon />
            </Button>
          </li>
        </ul>
      </span>
    </div>
  );
};

export default JobListItem;
