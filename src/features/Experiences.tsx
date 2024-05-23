import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import {
  useGetExperiencesQuery,
  useModifyExperienceMutation,
} from "../services/experiencesApi";
import { useRef, useState } from "react";
import ExperiencePanel from "../components/ExperiencePanel";

const Experiences = () => {
  const {
    data: experiences,
    // isError,
    // isSuccess,
    refetch,
  } = useGetExperiencesQuery();
  const [modifyExperience] = useModifyExperienceMutation();

  const [editExperienceId, setEdit] = useState<number | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);

  const companyRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    if (companyRef.current && titleRef.current && intervalRef.current) {
      modifyExperience({
        id: editExperienceId,
        company: companyRef.current.value,
        title: titleRef.current.value,
        interval: intervalRef.current.value,
      }).then(() => refetch());
    }
    setEdit(undefined);
  };

  const handleModify = (id: number) => {
    setEdit(id);
    setDialogOpen(true);
  };

  const experienceToModify = experiences?.data.find(
    (experience) => experience.id === editExperienceId,
  );

  const handleDelete = (id: number) => {};

  return (
    <div>
      {experiences?.data.map((experience) => (
        <ExperiencePanel
          experience={experience}
          onModify={handleModify}
          onDelete={handleDelete}
        />
      ))}
      <Dialog.Root open={dialogOpen}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Tapasztalat módosítása</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            Módosítsd tapasztalataidat
          </Dialog.Description>

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Pozíció
              </Text>
              <TextField.Root
                defaultValue={experienceToModify && experienceToModify.title}
                ref={titleRef}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Cég neve
              </Text>
              <TextField.Root
                defaultValue={experienceToModify && experienceToModify.company}
                ref={companyRef}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Intervallum
              </Text>
              <TextField.Root
                defaultValue={experienceToModify && experienceToModify.interval}
                ref={intervalRef}
              />
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Button
              variant="soft"
              color="gray"
              onClick={() => setDialogOpen(false)}
            >
              Vissza
            </Button>
            <Button onClick={handleSave}>Mentés</Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default Experiences;
