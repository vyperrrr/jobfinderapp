import { Button, Section, Table } from "@radix-ui/themes";
import { useAuth } from "../hooks/useAuth";
import { useGetExperiencesQuery } from "../services/experiencesApi";

import { Pencil2Icon } from "@radix-ui/react-icons";

const UserProfile = () => {
  const { user } = useAuth();
  const { data: experiences, isError, isSuccess } = useGetExperiencesQuery();

  return (
    <Section className="space-y-10">
      <div className="flex items-start justify-between">
        <span className="prose">
          <h1>Személyes adatok</h1>
          <h2>Adataid és tapasztalataid egy helyen.</h2>
        </span>
        <Button size="3">
          <Pencil2Icon />
          Tapasztalatok szerkesztése
        </Button>
      </div>
      <Table.Root>
        <Table.Body className="prose">
          <Table.Row>
            <Table.RowHeaderCell>Név</Table.RowHeaderCell>
            <Table.Cell>{user?.fullname}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Pozíció</Table.RowHeaderCell>
            <Table.Cell>{user?.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Leiírás</Table.RowHeaderCell>
            <Table.Cell>{user?.role}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <span className="prose flex">
        <h2>Korábbi tapasztalataid</h2>
      </span>
      <Table.Root>
        <Table.Header className="prose">
          <Table.Row>
            <Table.ColumnHeaderCell>Cég</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Pozíció</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Időszak</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body className="prose">
          {isError && <div>Hiba történt...</div>}
          {isSuccess &&
            experiences?.data.map((experience) => (
              <Table.Row key={experience.id}>
                <Table.Cell>{experience.company}</Table.Cell>
                <Table.Cell>{experience.title}</Table.Cell>
                <Table.Cell>{experience.interval}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table.Root>
    </Section>
  );
};

export default UserProfile;
