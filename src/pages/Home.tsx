import { Section } from "@radix-ui/themes";
import SearchBar from "../components/SearchBar";
import FilterForm from "../components/FilterForm";
import JobList from "../features/JobList";

const HomePage: React.FC = () => {
  return (
    <Section>
      <h1>Főoldal</h1>
      <h2>Keresés</h2>
      <SearchBar />
      <h2>Szűrők</h2>
      <FilterForm />
      <h2>Állások</h2>
      <p>Állások listája</p>
      <JobList />
    </Section>
  );
};

export default HomePage;
