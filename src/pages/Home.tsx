import { Button, Section } from "@radix-ui/themes";
import SearchBar from "../components/SearchBar";
import FilterForm from "../components/FilterForm";
import { ThickArrowDownIcon } from "@radix-ui/react-icons";
import JobList from "../components/JobList";
import { DropdownMenu } from "@radix-ui/themes";

const Home: React.FC = () => {
  return (
    <Section className="space-y-10">
      <h1 className="text-4xl font-semibold">Főoldal</h1>
      <h2 className="text-3xl font-semibold">Keresés</h2>
      <span className="flex items-center gap-x-2">
        <SearchBar />
        <DropdownMenu.Root dir="rtl">
          <DropdownMenu.Trigger>
            <Button variant="outline" size="3">
              <ThickArrowDownIcon />
              Szűrők
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="p-6">
            <FilterForm />
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </span>
      <h2 className="text-3xl font-semibold">Állások</h2>
      <JobList />
    </Section>
  );
};

export default Home;
