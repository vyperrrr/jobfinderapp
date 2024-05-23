import { Button, Table, TextField } from "@radix-ui/themes";
import {
  useGetExperiencesQuery,
  useModifyExperienceMutation,
} from "../services/experiencesApi";
import { useRef, useState } from "react";
import { Pencil2Icon, FileTextIcon } from "@radix-ui/react-icons";

const Experiences = () => {
  const {
    data: experiences,
    isError,
    isSuccess,
    refetch,
  } = useGetExperiencesQuery();
  const [modifyExperience] = useModifyExperienceMutation();

  const [editExperienceId, setEdit] = useState<number | undefined>(undefined);

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

  return (
    <Table.Root>
      <Table.Header className="prose">
        <Table.Row>
          <Table.ColumnHeaderCell>Cég</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Pozíció</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Időszak</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body className="prose">
        {isError && <div>Hiba történt...</div>}
        {isSuccess &&
          experiences?.data.map((experience) => (
            <Table.Row key={experience.id}>
              <Table.Cell>
                {editExperienceId === experience.id ? (
                  <TextField.Root
                    defaultValue={experience.company}
                    ref={companyRef}
                  />
                ) : (
                  experience.company
                )}
              </Table.Cell>
              <Table.Cell>
                {editExperienceId === experience.id ? (
                  <TextField.Root
                    defaultValue={experience.title}
                    ref={titleRef}
                  />
                ) : (
                  experience.title
                )}
              </Table.Cell>
              <Table.Cell>
                {editExperienceId === experience.id ? (
                  <TextField.Root
                    defaultValue={experience.interval}
                    ref={intervalRef}
                  />
                ) : (
                  experience.interval
                )}
              </Table.Cell>
              <Table.Cell>
                {editExperienceId === experience.id ? (
                  <Button size="1" onClick={handleSave}>
                    <FileTextIcon />
                    Mentés
                  </Button>
                ) : (
                  <Button size="1" onClick={() => setEdit(experience.id)}>
                    <Pencil2Icon />
                    Módosítás
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table.Root>
  );
};

export default Experiences;
