import { Badge, DataList, Section } from "@radix-ui/themes";
import { useAuth } from "../hooks/useAuth";
import Experiences from "../features/Experiences";
import Advertisements from "../features/Advertisements";
import Applications from "../features/Applications";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Section className="space-y-10">
      <h1 className="text-4xl font-semibold">Személyes adatok</h1>
      <DataList.Root>
        <DataList.Item>
          <DataList.Label minWidth="88px">Teljes név</DataList.Label>
          <DataList.Value>{user?.fullname}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Email</DataList.Label>
          <DataList.Value>{user?.email}</DataList.Value>
        </DataList.Item>
        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Státusz</DataList.Label>
          <DataList.Value>
            <Badge color="jade" variant="soft" radius="full">
              {user?.role === "company" ? "Munkáltató" : "Munkakereső"}
            </Badge>
          </DataList.Value>
        </DataList.Item>
      </DataList.Root>
      {user?.role === "company" ? (
        <Advertisements />
      ) : (
        <>
          <Applications />
          <Experiences />
        </>
      )}
    </Section>
  );
};

export default UserProfile;
