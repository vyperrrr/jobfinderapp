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
    <div className="flex h-40 items-center justify-between rounded-md rounded-sm  border-b-8 border-l-4 border-b-slate-300 border-l-slate-300 bg-slate-50 px-8 shadow-md dark:bg-slate-800 dark:text-slate-50">
      <span className="flex flex-col gap-y-4">
        <p className="text-2xl font-semibold">{experience.title}</p>
        <ul className="flex gap-x-4 [&>li]:flex [&>li]:items-center [&>li]:gap-x-1">
          <li>
            <BackpackIcon />
            <p>{experience.company}</p>
          </li>
          <li>
            <TimerIcon />
            <p>{experience.interval}</p>
          </li>
        </ul>
      </span>
      <span>
        <ul className="flex gap-x-4">
          <li>
            <Button
              variant="outline"
              onClick={onModify}
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
              onClick={() => onDelete(experience.id)}
              className="cursor-pointer"
            >
              Törlés
            </Button>
          </li>
        </ul>
      </span>
    </div>
  );
};

export default ExperiencePanel;
