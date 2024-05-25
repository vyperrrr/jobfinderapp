import { Job } from "../types";

import {
  BackpackIcon,
  SewingPinIcon,
  Pencil2Icon,
  TimerIcon,
  Link2Icon,
} from "@radix-ui/react-icons";
import { CiBadgeDollar } from "react-icons/ci";

import { formatSalary } from "../utils";

import { Badge, Button } from "@radix-ui/themes";

interface AdvertisementPanelProps {
  advertisement: Job;
  onModify: () => void;
  onShow: () => void;
  onDelete: () => void;
}

const AdvertisementPanel: React.FC<AdvertisementPanelProps> = ({
  advertisement,
  onModify,
  onShow,
  onDelete,
}) => {
  const salaryFormatted =
    formatSalary(advertisement.salaryFrom) +
    " - " +
    formatSalary(advertisement.salaryTo);

  return (
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
            <p>{salaryFormatted}</p>
          </li>
        </ul>
      </span>
      <span>
        <ul className="flex gap-x-4">
          <li>
            <Button variant="outline" onClick={onShow}>
              <Link2Icon />
              Megtekintés
            </Button>
          </li>
          <li>
            <Button variant="outline">
              <Pencil2Icon onClick={onModify} />
              Szerkesztés
            </Button>
          </li>
          <li>
            <Button variant="soft" color="red" onClick={onDelete}>
              Törlés
            </Button>
          </li>
        </ul>
      </span>
    </div>
  );
};

export default AdvertisementPanel;
