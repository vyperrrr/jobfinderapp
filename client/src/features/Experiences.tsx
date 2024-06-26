import { Button, Dialog, TextField } from "@radix-ui/themes";
import {
  useGetExperiencesQuery,
  useModifyExperienceMutation,
  useDeleteExperienceMutation,
  useAddExperienceMutation,
} from "../services/experiencesApi";
import { useState } from "react";
import ExperiencePanel from "../components/ExperiencePanel";
import { useForm, SubmitHandler } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import { Experience } from "../types";

interface FormState {
  id?: number; // id only exists when modifying
  title: string;
  company: string;
  interval: string;
}

const defaultFormState: FormState = {
  title: "",
  company: "",
  interval: "",
};

const Experiences = () => {
  const { data: experiences, isLoading, isError } = useGetExperiencesQuery();
  const [modifyExperience] = useModifyExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();
  const [addExperience] = useAddExperienceMutation();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [action, setAction] = useState<"add" | "modify" | undefined>(undefined);

  const { register, handleSubmit, reset } = useForm<FormState>();

  const onSubmit: SubmitHandler<FormState> = async (data) => {
    switch (action) {
      case "add":
        addExperience({
          title: data.title,
          company: data.company,
          interval: data.interval,
        });
        break;
      case "modify":
        modifyExperience({
          id: data.id,
          title: data.title,
          company: data.company,
          interval: data.interval,
        });
        break;
    }

    setAction(undefined);
    setDialogOpen(false);
  };

  function handleAction(action: "add" | "modify", experience?: Experience) {
    setAction(action);

    switch (action) {
      case "add":
        reset(defaultFormState);
        break;
      case "modify":
        reset(experience);
        break;
    }

    setDialogOpen(true);
  }

  function handleClose() {
    setAction(undefined);
    setDialogOpen(false);
  }

  return (
    <div>
      <span className="space-y-4">
        <span className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <h1 className="text-3xl font-semibold">Tapasztalatok</h1>
          <Button
            variant="outline"
            color="green"
            onClick={() => handleAction("add")}
            className="cursor-pointer"
          >
            Tapasztalat hozzáadása
          </Button>
        </span>
        {isError && <p>Hiba történt...</p>}
        {isLoading && <p>Tapasztalatok betöltése...</p>}
        {!isLoading &&
          !isError &&
          (experiences && experiences.data && experiences.data.length > 0 ? (
            experiences.data.map((experience) => (
              <ExperiencePanel
                key={experience.id}
                experience={experience}
                onModify={() => handleAction("modify", experience)}
                onDelete={() => deleteExperience(experience.id)}
              />
            ))
          ) : (
            <p>Még nem adtál meg tapasztalatot...</p>
          ))}
      </span>
      <Dialog.Root open={dialogOpen}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>
            {action === "modify"
              ? "Tapasztalat módosítása"
              : "Tapasztalat hozzáadása"}
          </Dialog.Title>
          <Dialog.Description size="2" mb="4">
            {action === "modify"
              ? "Módosítsa tapasztalatát."
              : "Adja meg tapasztalatát."}
          </Dialog.Description>
          <Form.Root onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Form.Field {...register("title")}>
              <Form.Label className="text-sm font-semibold">Pozíció</Form.Label>
              <Form.Control asChild>
                <TextField.Root />
              </Form.Control>
            </Form.Field>
            <Form.Field {...register("company")}>
              <Form.Label className="text-sm font-semibold">
                Munkahely
              </Form.Label>
              <Form.Control asChild>
                <TextField.Root />
              </Form.Control>
            </Form.Field>
            <Form.Field {...register("interval")}>
              <Form.Label className="text-sm font-semibold">
                Intervallum
              </Form.Label>
              <Form.Control asChild>
                <TextField.Root />
              </Form.Control>
            </Form.Field>
            <span className="float-right mt-6 flex items-center justify-end gap-x-2">
              <Button onClick={handleClose} className="cursor-pointer">
                Vissza
              </Button>
              <Form.Submit asChild>
                <Button variant="soft">
                  {action === "modify" ? "Módosítás" : "Hozzáadás"}
                </Button>
              </Form.Submit>
            </span>
          </Form.Root>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Experiences;
