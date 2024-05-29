import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useCreateJobMutation } from "../services/jobsApi";

import * as Form from "@radix-ui/react-form";
import {
  Checkbox,
  Select,
  TextField,
  Text,
  Button,
  Flex,
  TextArea,
} from "@radix-ui/themes";

interface FormState {
  company: string;
  position: string;
  description: string;
  salaryFrom: number;
  salaryTo: number;
  type: "part-time" | "full-time" | "internship";
  city: string;
  homeOffice: boolean;
}

const AdvertisementForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormState>();

  const [createJob] = useCreateJobMutation();

  const onSubmit: SubmitHandler<FormState> = (data) => createJob(data);

  return (
    <div className="rounded-md bg-slate-800 p-12">
      <div className=" space-y-10 rounded-md bg-slate-900 p-6 shadow-md">
        <Form.Root className="space-y-4 p-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-x-2 gap-y-4 md:flex-row">
            <Form.Field {...register("company")} className="flex-1">
              <Text as="label" size="2">
                Cég neve
              </Text>
              <Form.Control asChild>
                <TextField.Root type="text" />
              </Form.Control>
              {errors.company && (
                <Form.Label className="text-sm text-red-500">
                  {errors.company.message ?? "Nem megfelelő érték"}
                </Form.Label>
              )}
            </Form.Field>
            <Form.Field {...register("position")} className="flex-1">
              <Text as="label" size="2">
                Pozíció
              </Text>
              <Form.Control asChild>
                <TextField.Root type="text" />
              </Form.Control>
              {errors.position && (
                <Form.Label className="text-sm text-red-500">
                  {errors.position.message ?? "Nem megfelelő érték"}
                </Form.Label>
              )}
            </Form.Field>
          </div>
          <Form.Field {...register("description")}>
            <Text as="label" size="2">
              Leírás
            </Text>
            <Form.Control asChild>
              <TextArea size="3" resize="vertical" />
            </Form.Control>
            {errors.description && (
              <Form.Label className="text-sm text-red-500">
                {errors.description.message ?? "Nem megfelelő érték"}
              </Form.Label>
            )}
          </Form.Field>
          <div className="flex flex-col gap-x-2 gap-y-4 md:flex-row">
            <Form.Field
              {...register("salaryFrom", { valueAsNumber: true })}
              className="flex-1"
            >
              <Text as="label" size="2">
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
            <Form.Field
              {...register("salaryTo", { valueAsNumber: true })}
              className="flex-1"
            >
              <Text as="label" size="2">
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
          </div>

          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Flex direction="column">
                <Text as="label" size="2">
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
            <Form.Label className="text-sm">Település</Form.Label>
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
                    Home Office
                  </Flex>
                </Text>
              </div>
            )}
          />
          <Form.Submit asChild>
            <Button size="3" variant="surface" className="float-end">
              Létrehozás
            </Button>
          </Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
};

export default AdvertisementForm;