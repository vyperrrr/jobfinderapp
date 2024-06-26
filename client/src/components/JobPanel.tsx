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
    <div className="flex min-h-40 flex-col justify-between gap-y-2 rounded-md border-b-8 border-l-4 border-b-slate-300 border-l-slate-300 bg-slate-50 px-4 py-8 shadow-md md:flex-row md:items-center dark:bg-slate-800 dark:text-slate-50">
      <span className="flex flex-col gap-y-4">
        <span className="flex items-center gap-x-2">
          <h2 className="text-2xl font-semibold ">{job.position}</h2>
          <Badge color="green">{job.homeOffice ? "Remote" : "On-site"}</Badge>
        </span>
        <ul className="flex flex-col gap-y-2 md:flex-row md:gap-x-2 [&>li]:flex [&>li]:gap-x-2">
          <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-2 shadow-md md:p-4">
            <BackpackIcon className="h-4 w-4 text-emerald-400" />
            <p className="text-xs font-semibold">{job.company}</p>
          </li>
          <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-2 shadow-md md:p-4">
            <TimerIcon className="h-4 w-4 text-emerald-400" />
            <p className="text-xs font-semibold capitalize">{job.type}</p>
          </li>
          <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-2 shadow-md md:p-4">
            <SewingPinIcon className="h-4 w-4 text-emerald-400" />
            <p className="text-xs font-semibold">{job.city}</p>
          </li>
        </ul>
      </span>
      <span className="flex flex-col gap-y-4">
        <ul className="flex flex-col gap-y-2 md:flex-row [&>li]:flex [&>li]:gap-x-2">
          <li className="items-center rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
            <CiBadgeDollar className="h-8 w-8 text-emerald-400" />
            <p className="font-semibold">
              {prettyPrint(job.salaryFrom)
                .concat(" - ")
                .concat(prettyPrint(job.salaryTo))}
            </p>
          </li>
        </ul>
        <ul className="flex justify-end gap-x-4">
          <li>
            <Button
              variant="soft"
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="cursor-pointer"
            >
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
