import { Button, Section } from "@radix-ui/themes";
import SearchBar from "../components/SearchBar";
import FilterForm from "../features/FilterForm";
import { ThickArrowDownIcon } from "@radix-ui/react-icons";
import JobList from "../components/JobList";
import { DropdownMenu } from "@radix-ui/themes";

const Home: React.FC = () => {
  return (
    <Section className="space-y-10">
      <span className="flex items-center gap-x-2">
        <SearchBar />
        <DropdownMenu.Root dir="rtl">
          <DropdownMenu.Trigger>
            <Button variant="outline" size="3">
              <ThickArrowDownIcon />
              Szűrők
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content className="p-6 md:min-w-[600px]">
            <FilterForm />
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </span>
      <JobList />
    </Section>
  );
};

export default Home;
