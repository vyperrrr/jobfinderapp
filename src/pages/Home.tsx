import { Section } from "@radix-ui/themes";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";

const HomePage: React.FC = () => {
  return (
    <Section>
      <h1>Home</h1>
      <SearchBar />
      <Filters />
    </Section>
  );
};

export default HomePage;
