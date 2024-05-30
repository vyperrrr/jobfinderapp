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
} from "@radix-ui/react-icons";
import { CiBadgeDollar } from "react-icons/ci";

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
      <div className="flex h-40 items-center justify-between rounded-sm bg-slate-50  px-8 dark:bg-slate-800 dark:text-slate-50">
        <span className="flex flex-col gap-y-4">
          <span className="flex items-center gap-x-2">
            <p className="text-2xl font-semibold">{advertisement.position}</p>
            <Badge size="1" variant="solid">
              {advertisement.homeOffice ? "Remote" : "On-site"}
            </Badge>
          </span>
          <ul className="flex gap-x-4 [&>li]:flex [&>li]:items-center [&>li]:gap-x-1">
            <li>
              <BackpackIcon />
              <p>{advertisement.company}</p>
            </li>
            <li>
              <TimerIcon />
              <p>{advertisement.type}</p>
            </li>
            <li>
              <SewingPinIcon />
              <p>{advertisement.city}</p>
            </li>
            <li>
              <CiBadgeDollar />
              <p>0</p>
            </li>
          </ul>
        </span>
        <span>
          <ul className="flex gap-x-4">
            <li>
              <Button
                variant="outline"
                onClick={() => setOpen((prevOpen) => !prevOpen)}
              >
                <Link2Icon />
                {open ? "Jelentkezők elrejtése" : "Jelentkezők megtekintése"}
              </Button>
            </li>
            <li>
              <Button
                variant="outline"
                onClick={() => onEdit(advertisement.id)}
              >
                <Pencil2Icon />
                Szerkesztés
              </Button>
            </li>
            <li>
              <Button variant="soft" color="red" onClick={handleDelete}>
                Törlés
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
