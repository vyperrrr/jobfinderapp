import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";

import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "lodash";

const DEBOUNCE_TIME = 300;

const SearchBar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValueRef = useRef("");

  const debouncedSetSearchParams = debounce(() => {
    const searchValue = searchValueRef.current;
    if (searchValue === "") {
      searchParams.delete("search");
    } else {
      searchParams.set("search", searchValue);
    }
    setSearchParams(searchParams);
  }, DEBOUNCE_TIME);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    searchValueRef.current = event.target.value;
    debouncedSetSearchParams();
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
