import * as Form from "@radix-ui/react-form";
import { Button, TextField } from "@radix-ui/themes";

import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

type Inputs = {
  salaryFrom: number;
  salaryTo: number;
  type: "part-time" | "full-time" | "internship";
  city: string;
  homeOffice: boolean;
};

const FilterForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => setFilters(data);

  const setFilters = (data: Inputs) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== "" && value !== null && value !== undefined,
      ),
    );

    if (Object.keys(errors).length != 0) {
      return;
    }

    const stringifiedFilteredData = JSON.stringify(filteredData);

    // If the filters are different from the current filters, update the URL
    if (searchParams.get("filters") !== stringifiedFilteredData) {
      searchParams.set("filters", stringifiedFilteredData);
      setSearchParams(searchParams);
    }
  };

  const removeFilters = () => {
    searchParams.delete("filters");
    setSearchParams(searchParams);
  };

  let filters: Inputs | null = null;

  const filtersJSON = searchParams.get("filters");
  if (filtersJSON) {
    filters = JSON.parse(filtersJSON);
  }

  return (
    <span className="space-y-2">
      <Form.Root className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <Form.Field
          {...register("salaryFrom", {
            validate: {
              geZero: (value) =>
                value >= 0 || "Nullát vagy pozitív számot kell megadnod.",
            },
          })}
        >
          <Form.Label>Fizetési sáv alja</Form.Label>
          <Form.Control asChild>
            <TextField.Root
              type="number"
              defaultValue={filters?.salaryFrom ?? ""}
            />
          </Form.Control>
          {errors.salaryFrom && (
            <Form.Label className="text-sm text-red-500">
              {errors.salaryFrom.message ?? "Nem megfelelő érték"}
            </Form.Label>
          )}
        </Form.Field>
        <Form.Field
          {...register("salaryTo", {
            validate: {
              geZero: (value) =>
                value >= 0 || "Nullát vagy pozitív számot kell megadnod.",
            },
          })}
        >
          <Form.Label>Fizetési sáv teteje</Form.Label>
          <Form.Control asChild>
            <TextField.Root
              type="number"
              defaultValue={filters?.salaryTo ?? ""}
            />
          </Form.Control>
          {errors.salaryTo && (
            <Form.Label className="text-sm text-red-500">
              {errors.salaryTo.message ?? "Nem megfelelő érték"}
            </Form.Label>
          )}
        </Form.Field>
        <Form.Field {...register("type")}>
          <Form.Label>Foglalkoztatás típusa</Form.Label>
          <Form.Control asChild>
            <select defaultValue={filters?.type ?? "full-time"}>
              <option value="full-time">Teljes állás</option>
              <option value="part-time">Részmunkaidős állás</option>
              <option value="internship">Gyakornoki állás</option>
            </select>
          </Form.Control>
        </Form.Field>
        <Form.Field {...register("city")}>
          <Form.Label>Település</Form.Label>
          <Form.Control asChild>
            <TextField.Root defaultValue={filters?.city ?? ""} />
          </Form.Control>
        </Form.Field>
        <Form.Field {...register("homeOffice")}>
          <Form.Label>Home Office lehetőség</Form.Label>
          <Form.Control asChild>
            <input
              type="checkbox"
              defaultChecked={filters?.homeOffice ?? false}
            />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <Button variant="soft">Szűrők alkalmazása</Button>
        </Form.Submit>
      </Form.Root>
      <Button variant="solid" color="red" onClick={removeFilters}>
        Szűrők eltávolítása
      </Button>
    </span>
  );
};

export default FilterForm;
