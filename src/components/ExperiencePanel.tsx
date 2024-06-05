import { BackpackIcon, TimerIcon } from "@radix-ui/react-icons";
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
    <div className="flex min-h-40 flex-col justify-between gap-y-2 rounded-md border-b-8 border-l-4 border-b-slate-300 border-l-slate-300 bg-slate-50 p-4 shadow-md md:flex-row md:items-center dark:bg-slate-800 dark:text-slate-50">
      <span className="flex flex-col gap-y-4">
        <h2 className="text-2xl font-semibold ">{experience.title}</h2>
        <ul className="flex flex-col gap-2 md:flex-row [&>li]:flex [&>li]:items-center [&>li]:gap-x-2">
          <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-2 shadow-md md:p-4">
            <BackpackIcon className="h-4 w-4 text-emerald-400" />
            <p className="text-xs font-semibold">{experience.company}</p>
          </li>
          <li className="rounded-md border-b-4 border-b-slate-300 bg-slate-700 p-2 shadow-md md:p-4">
            <TimerIcon className="h-4 w-4 text-emerald-400" />
            <p className="text-xs font-semibold capitalize">
              {experience.interval}
            </p>
          </li>
        </ul>
      </span>
      <span className="flex flex-col gap-y-4 md:items-end">
        <ul className="flex flex-col gap-2 gap-x-2 md:flex-row">
          <li>
            <Button
              variant="outline"
              onClick={() => onModify()}
              className="w-full cursor-pointer"
            >
              <p>Szerkesztés</p>
            </Button>
          </li>
          <li>
            <Button
              variant="surface"
              color="red"
              onClick={() => onDelete(experience.id)}
              className="w-full cursor-pointer"
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
