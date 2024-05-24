import { Section, Table } from "@radix-ui/themes";
import { useAuth } from "../hooks/useAuth";
import Experiences from "../features/Experiences";
import Advertisements from "../features/Advertisements";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Section className="space-y-10">
      <h1 className="text-4xl font-semibold">Személyes adatok</h1>
      <Table.Root variant="ghost">
        <Table.Body>
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
      {user?.role === "company" ? <Advertisements /> : <Experiences />}
    </Section>
  );
};

export default UserProfile;
