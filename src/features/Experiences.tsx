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
  const { data: experiences, refetch } = useGetExperiencesQuery();
  const [modifyExperience] = useModifyExperienceMutation();
  const [deleteExperience] = useDeleteExperienceMutation();
  const [addExperience] = useAddExperienceMutation();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [action, setAction] = useState<"add" | "modify" | undefined>(undefined);

  const { register, handleSubmit, reset } = useForm();

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

    refetch();
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

  function handleDelete(id: number) {
    deleteExperience({ id });
    refetch();
  }

  function handleClose() {
    setAction(undefined);
    setDialogOpen(false);
  }

  return (
    <div>
      <span className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Tapasztalatok</h1>
        <Button color="green" onClick={() => handleAction("add")}>
          Tapasztalat hozzáadása
        </Button>
      </span>
      {experiences?.data.map((experience) => (
        <ExperiencePanel
          key={experience.id}
          experience={experience}
          onModify={() => handleAction("modify", experience)}
          onDelete={handleDelete}
        />
      ))}
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
          <Form.Root onSubmit={handleSubmit(onSubmit)}>
            <Form.Field {...register("title")}>
              <Form.Label>Pozíció</Form.Label>
              <Form.Control asChild>
                <TextField.Root />
              </Form.Control>
            </Form.Field>
            <Form.Field {...register("company")}>
              <Form.Label>Munkahely</Form.Label>
              <Form.Control asChild>
                <TextField.Root />
              </Form.Control>
            </Form.Field>
            <Form.Field {...register("interval")}>
              <Form.Label>Intervallum</Form.Label>
              <Form.Control asChild>
                <TextField.Root />
              </Form.Control>
            </Form.Field>
            <span className="float-right mt-6 flex items-center justify-end gap-x-2">
              <Button onClick={handleClose}>Vissza</Button>
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
