import { Section } from "@radix-ui/themes";
import SearchBar from "../components/SearchBar";
import FilterForm from "../features/FilterForm";
import JobList from "../features/JobList/";

const Home: React.FC = () => {
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

export default Home;
