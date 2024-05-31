import { Job } from "../types";

import { useDeleteJobMutation } from "../services/jobsApi";
import { useState } from "react";

import { Badge, Button } from "@radix-ui/themes";

import Applicants from "../features/Applicants";

import {
  BackpackIcon,
  SewingPinIcon,
  Pencil2Icon,
  TimerIcon,
  Link2Icon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { CiBadgeDollar } from "react-icons/ci";
import { prettyPrint } from "../utils";

interface AdvertisementPanelProps {
  advertisement: Job;
  onEdit: (id: number) => void;
}

const AdvertisementPanel: React.FC<AdvertisementPanelProps> = ({
  advertisement,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);

  const [deleteJob] = useDeleteJobMutation();

  function handleDelete() {
    deleteJob(advertisement.id);
  }

  return (
    <>
      <div className="flex min-h-40 items-center justify-between rounded-md border-b-8 border-l-4 border-b-slate-300 border-l-slate-300 bg-slate-50 px-8 shadow-md dark:bg-slate-800 dark:text-slate-50">
        <span className="flex flex-col items-start gap-y-4">
          <span className="flex items-center gap-x-2">
            <h2 className="text-2xl font-semibold ">
              {advertisement.position}
            </h2>
            <Badge color="green">
              {advertisement.homeOffice ? "Remote" : "On-site"}
            </Badge>
          </span>
          <ul className="flex gap-x-2 [&>li]:flex [&>li]:items-center [&>li]:gap-x-2">
            <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
              <BackpackIcon className="h-4 w-4 text-emerald-400" />
              <p className="text-xs font-semibold">{advertisement.company}</p>
            </li>
            <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
              <TimerIcon className="h-4 w-4 text-emerald-400" />
              <p className="text-xs font-semibold capitalize">
                {advertisement.type}
              </p>
            </li>
            <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
              <SewingPinIcon className="h-4 w-4 text-emerald-400" />
              <p className="text-xs font-semibold">{advertisement.city}</p>
            </li>
          </ul>
        </span>
        <span className="flex flex-col items-end gap-y-4">
          <ul className="flex [&>li]:flex [&>li]:items-center [&>li]:gap-x-2">
            <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
              <CiBadgeDollar className="h-8 w-8 text-emerald-400" />
              <p className="font-semibold">
                {prettyPrint(advertisement.salaryFrom)
                  .concat(" - ")
                  .concat(prettyPrint(advertisement.salaryTo))}
              </p>
            </li>
          </ul>
          <ul className="flex gap-x-4">
            <li>
              <Button
                variant="outline"
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                className="cursor-pointer"
              >
                <Link2Icon />
                {open ? "Jelentkezők elrejtése" : "Jelentkezők megtekintése"}
              </Button>
            </li>
            <li>
              <Button
                variant="outline"
                onClick={() => onEdit(advertisement.id)}
                className="cursor-pointer"
              >
                <Pencil2Icon />
                Szerkesztés
              </Button>
            </li>
            <li>
              <Button
                variant="soft"
                color="red"
                onClick={handleDelete}
                className="cursor-pointer"
              >
                <CrossCircledIcon />
                <p>Törlés</p>
              </Button>
            </li>
          </ul>
        </span>
      </div>
      {open && <Applicants advertisementId={advertisement.id} />}
    </>
  );
};

export default AdvertisementPanel;
