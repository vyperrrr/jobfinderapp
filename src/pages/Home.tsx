import { Section } from "@radix-ui/themes";
import SearchBar from "../components/SearchBar";
import FilterForm from "../components/FilterForm";
import JobList from "../components/JobList";

const Home: React.FC = () => {
  return (
    <Section className="space-y-10">
      <h1>Főoldal</h1>
      <h2>Keresés</h2>
      <SearchBar />
      <h2>Szűrők</h2>
      <FilterForm />
      <h2>Állások</h2>
      <JobList />
    </Section>
  );
};

export default Home;
