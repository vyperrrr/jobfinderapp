import { Section, Table } from "@radix-ui/themes";
import { useAuth } from "../hooks/useAuth";
import Experiences from "../features/Experiences";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Section className="space-y-10">
      <span className="prose">
        <h1>Személyes adatok</h1>
        <h2>Adataid és tapasztalataid egy helyen.</h2>
      </span>
      <Table.Root>
        <Table.Body className="prose">
          <Table.Row>
            <Table.RowHeaderCell>Név</Table.RowHeaderCell>
            <Table.Cell>{user?.fullname}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Email</Table.RowHeaderCell>
            <Table.Cell>{user?.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.RowHeaderCell>Státusz</Table.RowHeaderCell>
            <Table.Cell>{user?.role}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
      <span className="prose flex">
        <h2>Korábbi tapasztalataid</h2>
      </span>
      <Experiences />
    </Section>
  );
};

export default UserProfile;
