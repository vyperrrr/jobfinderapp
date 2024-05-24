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
    <div className="flex h-40 items-center justify-between rounded-sm  bg-slate-50 px-8 hover:bg-slate-100">
      <span>
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
            <Button onClick={onModify}>
              <Pencil2Icon />
              Szerkesztés
            </Button>
          </li>
          <li>
            <Button color="red" onClick={() => onDelete(experience.id)}>
              Törlés
            </Button>
          </li>
        </ul>
      </span>
    </div>
  );
};

export default ExperiencePanel;
