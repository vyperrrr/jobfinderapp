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

import { Badge, Button, ScrollArea } from "@radix-ui/themes";

import { useDeleteJobMutation } from "../services/jobsApi";
import { useGetJobApplicantsQuery } from "../services/applicantsApi";
import { useState } from "react";
import { Link } from "react-router-dom";

interface AdvertisementPanelProps {
  advertisement: Job;
  onDelete: () => void;
  onEdit: (id: number) => void;
}

const AdvertisementPanel: React.FC<AdvertisementPanelProps> = ({
  advertisement,
  onDelete,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);

  const [deleteJob] = useDeleteJobMutation();
  const { data: applicants } = useGetJobApplicantsQuery(
    {
      jobId: advertisement.id,
    },
    { skip: !open || !advertisement },
  );

  const salaryFormatted =
    formatSalary(advertisement.salaryFrom) +
    " - " +
    formatSalary(advertisement.salaryTo);
  console.log(applicants);

  function handleDelete() {
    deleteJob({ id: advertisement.id });
    onDelete();
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
      <div className={open ? "block" : "hidden"}>
        {applicants?.length === 0 ? (
          <h1>Nincsenek jelentkezők</h1>
        ) : (
          <ScrollArea type="auto" scrollbars="vertical">
            <ul className="space-y-2">
              {applicants?.map((applicant) => (
                <li
                  key={applicant.user.id}
                  className="rounded-md bg-slate-700 p-4"
                >
                  <span className="flex items-center justify-between">
                    <ul className="flex flex-col">
                      <li>
                        <p className="font-semibold">
                          {applicant.user.fullname}
                        </p>
                      </li>
                      <li className="text-xs">{applicant.user.email}</li>
                    </ul>
                    <span className="flex gap-x-2">
                      <Button variant="soft" color="red">
                        Jelentkező eltávolítása
                      </Button>
                      <Link to={`/profile/${applicant.user.id}`}>
                        <Button variant="surface">Tovább a profilra</Button>
                      </Link>
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </div>
    </>
  );
};

export default AdvertisementPanel;
