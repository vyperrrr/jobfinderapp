import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);

    if (event.target.value === "") {
      searchParams.delete("search");
      setSearchParams(searchParams);
      return;
    }

    debounce(() => {
      searchParams.set("search", event.target.value);
      setSearchParams(searchParams);
    }, 1000)();
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
