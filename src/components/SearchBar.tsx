import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  console.log(searchParams.get("search"));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setSearch(searchValue);

    if (searchValue === "") {
      searchParams.delete("search");
      setSearchParams(searchParams);
      return;
    }

    searchParams.set("search", searchValue);

    debounce(() => {
      setSearchParams(searchParams);
    }, 1000)();
  };

  //When the search query changes in the URL, update the search state
  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  return (
    <TextField.Root
      placeholder="Search for a job..."
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
