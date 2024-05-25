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

import { Badge, Button, Dialog } from "@radix-ui/themes";
import { useState } from "react";

const AdvertisementPanel: React.FC<{ advertisement: Job }> = ({
  advertisement,
}) => {
  const salaryFormatted =
    formatSalary(advertisement.salaryFrom) +
    " - " +
    formatSalary(advertisement.salaryTo);

  const [dialogOpen, setDialogOpen] = useState(false);

  function handleShowApplicants() {
    setDialogOpen(true);
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
              <p>{salaryFormatted}</p>
            </li>
          </ul>
        </span>
        <span>
          <ul className="flex gap-x-4">
            <li>
              <Button variant="outline" onClick={handleShowApplicants}>
                <Link2Icon />
                Megtekintés
              </Button>
            </li>
            <li>
              <Button variant="outline">
                <Pencil2Icon />
                Szerkesztés
              </Button>
            </li>
            <li>
              <Button variant="soft" color="red">
                Törlés
              </Button>
            </li>
          </ul>
        </span>
      </div>
      <Dialog.Root open={dialogOpen}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Jelentkezők</Dialog.Title>
          <Dialog.Description size="2" mb="4"></Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default AdvertisementPanel;
