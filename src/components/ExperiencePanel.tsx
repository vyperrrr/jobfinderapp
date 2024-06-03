import { BackpackIcon, Pencil2Icon, TimerIcon } from "@radix-ui/react-icons";
import { Experience } from "../types";
import { Button } from "@radix-ui/themes";

type ExperiencePanelProps = {
  experience: Experience;
  onModify: () => void;
  onDelete: (id: number) => void;
};

const ExperiencePanel: React.FC<ExperiencePanelProps> = ({
  experience,
  onModify,
  onDelete,
}) => {
  return (
    <div className="flex h-40 items-center justify-between rounded-md border-b-8 border-l-4 border-b-slate-300 border-l-slate-300 bg-slate-50 px-8 shadow-md dark:bg-slate-800 dark:text-slate-50">
      <span className="flex flex-col items-start gap-y-4">
        <span className="flex items-center gap-x-2">
          <h2 className="text-2xl font-semibold ">{experience.title}</h2>
        </span>
        <ul className="flex gap-x-2 [&>li]:flex [&>li]:items-center [&>li]:gap-x-2">
          <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
            <BackpackIcon className="h-4 w-4 text-emerald-400" />
            <p className="text-xs font-semibold">{experience.company}</p>
          </li>
          <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-4 shadow-md">
            <TimerIcon className="h-4 w-4 text-emerald-400" />
            <p className="text-xs font-semibold capitalize">
              {experience.interval}
            </p>
          </li>
        </ul>
      </span>
      <span className="flex flex-col items-end gap-y-4">
        <ul className="flex gap-x-4">
          <li>
            <Button
              variant="outline"
              onClick={() => onModify()}
              className="cursor-pointer"
            >
              <p>Szerkesztés</p>
            </Button>
          </li>
          <li>
            <Button
              variant="surface"
              color="red"
              onClick={() => onDelete(experience.id)}
              className="cursor-pointer"
            >
              <p>Törlés</p>
            </Button>
          </li>
        </ul>
      </span>
    </div>
  );
};

export default ExperiencePanel;
