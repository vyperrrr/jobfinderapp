import { Job } from "../types";

import {
  BackpackIcon,
  SewingPinIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { CiBadgeDollar } from "react-icons/ci";

import { formatSalary } from "../utils";

import { Button } from "@radix-ui/themes";

const AdvertisementPanel: React.FC<{ advertisement: Job }> = ({
  advertisement,
}) => {
  const salaryFormatted =
    formatSalary(advertisement.salaryFrom) +
    " - " +
    formatSalary(advertisement.salaryTo);

  return (
    <div className="flex h-40 items-center justify-between rounded-sm  bg-slate-50 px-8 hover:bg-slate-100">
      <span>
        <p className="text-2xl font-semibold">{advertisement.position}</p>
        <ul className="flex gap-x-4 [&>li]:flex [&>li]:items-center [&>li]:gap-x-1">
          <li>
            <BackpackIcon />
            <p>{advertisement.type}</p>
          </li>
          <li>
            <SewingPinIcon />
            <p>{advertisement.homeOffice ? "Remote" : "On-site"}</p>
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
            <Button>
              <Pencil2Icon />
              Szerkesztés
            </Button>
          </li>
          <li>
            <Button color="red">Törlés</Button>
          </li>
        </ul>
      </span>
    </div>
  );
};

export default AdvertisementPanel;
