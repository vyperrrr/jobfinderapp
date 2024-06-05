import { Avatar, Badge, DataList, Quote, Section } from "@radix-ui/themes";
import { useAuth } from "../hooks/useAuth";
import Experiences from "../features/Experiences";
import Advertisements from "../features/Advertisements";
import Applications from "../features/Applications";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Section className="space-y-10 px-2">
      <span className="flex flex-col items-center md:flex-row md:justify-between">
        <Avatar
          src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
          fallback="A"
          size="6"
          radius="full"
          color="orange"
        />
        <span>
          <h1 className="text-4xl font-semibold">Személyes adatok</h1>
          <Quote className="hidden text-xl md:block">
            Adataid egy helyen...
          </Quote>
        </span>
      </span>

      <DataList.Root
        orientation={{ initial: "vertical", sm: "horizontal" }}
        className="rounded-l-lg border-b-8 border-l-4 border-b-slate-300 border-l-slate-300 bg-slate-800 p-8 shadow-md"
      >
        <h2 className="text-2xl font-semibold">Adatlap</h2>
        <DataList.Item className="rounded-md border-b-2 border-b-slate-300 bg-slate-900 px-2 py-2">
          <DataList.Label minWidth="88px" className="font-semibold">
            Teljes név
          </DataList.Label>
          <DataList.Value>{user?.fullname}</DataList.Value>
        </DataList.Item>
        <DataList.Item className="rounded-md border-b-2 border-b-slate-300  bg-slate-900 px-2 py-2">
          <DataList.Label minWidth="88px" className="font-semibold">
            Email
          </DataList.Label>
          <DataList.Value>{user?.email}</DataList.Value>
        </DataList.Item>
        <DataList.Item className="rounded-md border-b-2 border-b-slate-300  bg-slate-900 px-2 py-2">
          <DataList.Label minWidth="88px" className="font-semibold">
            Státusz
          </DataList.Label>
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
