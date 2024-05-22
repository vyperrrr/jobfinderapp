import { Section } from "@radix-ui/themes";
import SearchBar from "../components/SearchBar";
import FilterForm from "../components/FilterForm";
import JobList from "../components/JobList";

const Home: React.FC = () => {
  return (
    <Section className="space-y-10">
      <span className="prose">
        <h1>Főoldal</h1>
        <h2>Keresés</h2>
      </span>
      <SearchBar />
      <span className="prose">
        <h2>Szűrők</h2>
      </span>
      <FilterForm />
      <span className="prose">
        <h2>Állások</h2>
        <h3>Állások listája</h3>
      </span>
      <JobList />
    </Section>
  );
};

export default Home;
