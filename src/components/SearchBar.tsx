import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";
import { compareSearchParams } from "../utils";

const DEBOUNCE_TIME = 300;

const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValueRef = useRef("");

  const debouncedSetSearchParams = debounce(() => {
    const searchValue = searchValueRef.current;

    if (compareSearchParams(searchParams.get("search"), searchValue)) {
      return;
    }

    if (searchValue === "") {
      searchParams.delete("search");
    } else {
      searchParams.set("search", searchValue);
    }
    setSearchParams(searchParams, { replace: true });
  }, DEBOUNCE_TIME);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchValueRef.current = event.target.value;
    debouncedSetSearchParams();
  };

  return (
    <TextField.Root
      className="flex-1"
      placeholder="Keresés..."
      size="3"
      onChange={handleChange}
    >
      <TextField.Slot side="right" pr="4">
        <MagnifyingGlassIcon height="24" width="24" />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default SearchBar;
