import { Section } from "@radix-ui/themes";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

const HomePage: React.FC = () => {
  return (
    <Section>
      <h1>Főoldal</h1>
      <h2>Keresés</h2>
      <SearchBar />
      <h2>Szűrők</h2>
      <Filters />
    </Section>
  );
};

export default HomePage;
