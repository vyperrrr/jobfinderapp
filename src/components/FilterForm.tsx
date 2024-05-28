import * as Form from "@radix-ui/react-form";
import {
  Button,
  Checkbox,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { compareSearchParams } from "../utils";

export type Inputs = {
  type: "part-time" | "full-time" | "internship";
  city: string;
  salaryFrom: number;
  salaryTo: number;
  homeOffice: boolean;
};

const FilterForm: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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
    setSearchParams(searchParams, { replace: true });
  };

  const removeFilters = () => {
    searchParams.delete("filters");
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <>
      <Form.Root className="space-y-4 p-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Field {...register("salaryFrom")}>
          <Text as="label" size="2" weight="bold">
            Fizetési sáv alja
          </Text>
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
          <Text as="label" size="2" weight="bold">
            Fizetési sáv teteje
          </Text>
          <Form.Control asChild>
            <TextField.Root type="number" />
          </Form.Control>
          {errors.salaryTo && (
            <Form.Label className="text-sm text-red-500">
              {errors.salaryTo.message ?? "Nem megfelelő érték"}
            </Form.Label>
          )}
        </Form.Field>
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Flex direction="column">
              <Text as="label" size="2" weight="bold">
                Munka típusa
              </Text>
              <Select.Root onValueChange={onChange} value={value}>
                <Select.Trigger placeholder="Válassz egy típust..." />
                <Select.Content position="popper">
                  <Select.Group>
                    <Select.Label>Típusok</Select.Label>
                    <Select.Item value="full-time">
                      Teljes munkaidős
                    </Select.Item>
                    <Select.Item value="part-time">Részmunkaidős</Select.Item>
                    <Select.Item value="internship">
                      Gyakornoki munka
                    </Select.Item>
                  </Select.Group>
                </Select.Content>
              </Select.Root>
            </Flex>
          )}
        />
        <Form.Field {...register("city")}>
          <Form.Label className="text-sm font-semibold">Település</Form.Label>
          <Form.Control asChild>
            <TextField.Root />
          </Form.Control>
          {errors.city && (
            <Form.Label className="text-sm text-red-500">
              {errors.city.message ?? "Nem megfelelő érték"}
            </Form.Label>
          )}
        </Form.Field>
        <Controller
          control={control}
          name="homeOffice"
          defaultValue={false}
          render={({ field: { onChange, value } }) => (
            <div>
              <Text as="label" size="2">
                <Flex gap="2">
                  <Checkbox checked={value} onCheckedChange={onChange} />
                  Home office lehetőség
                </Flex>
              </Text>
            </div>
          )}
        />
        <span className="flex gap-x-2">
          <Form.Submit asChild>
            <Button size="3" variant="outline">
              Szűrők alkalmazása
            </Button>
          </Form.Submit>
          <Button
            size="3"
            variant="solid"
            color="red"
            onClick={(event) => {
              event.preventDefault();
              removeFilters();
            }}
          >
            Szűrők eltávolítása
          </Button>
        </span>
      </Form.Root>
    </>
  );
};

export default FilterForm;
