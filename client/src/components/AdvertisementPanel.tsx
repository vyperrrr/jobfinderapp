import { Job } from "../types";

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
  onDelete: (id: number) => void;
}

const AdvertisementPanel: React.FC<AdvertisementPanelProps> = ({
  advertisement,
  onEdit,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-40 flex-col justify-between gap-y-2 rounded-md border-b-8 border-l-4 border-b-slate-300 border-l-slate-300 bg-slate-50 px-4 py-8 shadow-md md:flex-row md:items-center dark:bg-slate-800 dark:text-slate-50">
        <span className="flex flex-col gap-y-4 md:items-start">
          <span className="flex items-center gap-x-2">
            <h2 className="text-2xl font-semibold ">
              {advertisement.position}
            </h2>
            <Badge color="green">
              {advertisement.homeOffice ? "Remote" : "On-site"}
            </Badge>
          </span>
          <ul className="flex flex-col gap-2 md:flex-row [&>li]:flex [&>li]:items-center [&>li]:gap-x-2">
            <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-2 shadow-md md:p-4">
              <BackpackIcon className="h-4 w-4 text-emerald-400" />
              <p className="text-xs font-semibold">{advertisement.company}</p>
            </li>
            <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-2 shadow-md md:p-4">
              <TimerIcon className="h-4 w-4 text-emerald-400" />
              <p className="text-xs font-semibold capitalize">
                {advertisement.type}
              </p>
            </li>
            <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-2 shadow-md md:p-4">
              <SewingPinIcon className="h-4 w-4 text-emerald-400" />
              <p className="text-xs font-semibold">{advertisement.city}</p>
            </li>
          </ul>
        </span>
        <span className="flex flex-col gap-y-4 md:items-end">
          <ul className="flex flex-col gap-y-2 md:flex-row [&>li]:flex [&>li]:gap-x-2">
            <li className="items-center rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
              <CiBadgeDollar className="h-8 w-8 text-emerald-400" />
              <p className="font-semibold">
                {prettyPrint(advertisement.salaryFrom)
                  .concat(" - ")
                  .concat(prettyPrint(advertisement.salaryTo))}
              </p>
            </li>
          </ul>
          <ul className="flex flex-col gap-2 gap-x-4 md:flex-row md:justify-end">
            <li>
              <Button
                variant="outline"
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                className="w-full cursor-pointer"
              >
                <Link2Icon />
                {open ? "Jelentkezők elrejtése" : "Jelentkezők megtekintése"}
              </Button>
            </li>
            <li>
              <Button
                variant="outline"
                onClick={() => onEdit(advertisement.id)}
                className="w-full cursor-pointer"
              >
                <Pencil2Icon />
                Szerkesztés
              </Button>
            </li>
            <li>
              <Button
                variant="soft"
                color="red"
                onClick={() => onDelete(advertisement.id)}
                className="w-full cursor-pointer"
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
