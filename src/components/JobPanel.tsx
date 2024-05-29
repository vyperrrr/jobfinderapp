import { useNavigate } from "react-router-dom";
import { Job } from "../types";

import { Button } from "@radix-ui/themes";
import { Badge } from "@radix-ui/themes";

import {
  BackpackIcon,
  SewingPinIcon,
  TimerIcon,
  Link2Icon,
} from "@radix-ui/react-icons";
import { CiBadgeDollar } from "react-icons/ci";

const JobListItem: React.FC<{ job: Job }> = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="flex h-40 items-center justify-between rounded-sm bg-slate-50  px-8 dark:bg-slate-800 dark:text-slate-50">
      <span className="flex flex-col gap-y-4">
        <span className="flex items-center gap-x-2">
          <p className="text-2xl font-semibold">{job.position}</p>
          <Badge size="1" variant="solid">
            {job.homeOffice ? "Remote" : "On-site"}
          </Badge>
        </span>
        <ul className="flex gap-x-4 [&>li]:flex [&>li]:items-center [&>li]:gap-x-1">
          <li>
            <BackpackIcon />
            <p>{job.company}</p>
          </li>
          <li>
            <SewingPinIcon />
            <p>{job.city}</p>
          </li>
          <li>
            <TimerIcon />
            <p>{job.type}</p>
          </li>
        </ul>
      </span>
      <span className="flex flex-col items-end gap-y-4">
        <ul>
          <li className="flex items-center justify-center gap-x-2">
            <CiBadgeDollar className="h-8 w-8" />
            <p className="text-lg">0</p>
          </li>
        </ul>

        <Button variant="soft" onClick={() => navigate(`/jobs/${job.id}`)}>
          <Link2Icon />
          Részletek
        </Button>
      </span>
    </div>
  );
};

export default JobListItem;
