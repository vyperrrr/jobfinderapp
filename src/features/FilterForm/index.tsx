import * as Form from "@radix-ui/react-form";
import { Button, TextField } from "@radix-ui/themes";

import { useForm, SubmitHandler } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { compareSearchParams } from "../../utils";

import { Inputs } from "./types";

const FilterForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => setFilters(data);

  const setFilters = (data: Inputs) => {
    if (Object.keys(errors).length != 0) {
      return;
    }

    const stringifiedData = JSON.stringify(data);

    const currentFilters = searchParams.get("filters");

    if (compareSearchParams(currentFilters, stringifiedData)) {
      return;
    }

    searchParams.set("filters", stringifiedData);
    setSearchParams(searchParams);
  };

  const removeFilters = () => {
    searchParams.delete("filters");
    setSearchParams(searchParams);
  };

  return (
    <span className="space-y-2">
      <Form.Root className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <Form.Field {...register("salaryFrom")}>
          <Form.Label>Fizetési sáv alja</Form.Label>
          <Form.Control asChild>
            <TextField.Root type="number" />
          </Form.Control>
          {errors.salaryFrom && (
            <Form.Label className="text-sm text-red-500">
              {errors.salaryFrom.message ?? "Nem megfelelő érték"}
            </Form.Label>
          )}
        </Form.Field>
        <Form.Field {...register("salaryTo")}>
          <Form.Label>Fizetési sáv teteje</Form.Label>
          <Form.Control asChild>
            <TextField.Root type="number" />
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
            <select>
              <option value="" defaultChecked>
                Válassz egy lehetőséget
              </option>
              <option value="full-time">Teljes állás</option>
              <option value="part-time">Részmunkaidős állás</option>
              <option value="internship">Gyakornoki állás</option>
            </select>
          </Form.Control>
          {errors.type && (
            <Form.Label className="text-sm text-red-500">
              {errors.type.message ?? "Nem megfelelő érték"}
            </Form.Label>
          )}
        </Form.Field>
        <Form.Field {...register("city")}>
          <Form.Label>Település</Form.Label>
          <Form.Control asChild>
            <TextField.Root />
          </Form.Control>
          {errors.city && (
            <Form.Label className="text-sm text-red-500">
              {errors.city.message ?? "Nem megfelelő érték"}
            </Form.Label>
          )}
        </Form.Field>
        <Form.Field {...register("homeOffice")}>
          <Form.Label>Home Office lehetőség</Form.Label>
          <Form.Control asChild>
            <input type="checkbox" />
          </Form.Control>
          {errors.homeOffice && (
            <Form.Label className="text-sm text-red-500">
              {errors.homeOffice.message ?? "Nem megfelelő érték"}
            </Form.Label>
          )}
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
