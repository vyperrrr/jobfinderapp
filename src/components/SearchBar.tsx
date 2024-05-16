import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const [_, setSearchParams] = useSearchParams();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
    debounce(() => setSearchParams({ search: event.target.value }), 1000)();
  };

  return (
    <TextField.Root
      placeholder="Search the docs…"
      value={search}
      onChange={handleChange}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default SearchBar;
