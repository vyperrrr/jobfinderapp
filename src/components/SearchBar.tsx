import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

const DEBOUNCE_TIME = 1000;

const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;

    if (searchValue === "") {
      searchParams.delete("search");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("search", searchValue);

    debounce(() => {
      setSearchParams(searchParams);
    }, DEBOUNCE_TIME)();
  };

  return (
    <TextField.Root onChange={handleChange}>
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default SearchBar;
