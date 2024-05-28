import { Controller, useForm, SubmitHandler } from "react-hook-form";
import * as Form from "@radix-ui/react-form";
import {
  Checkbox,
  Select,
  TextField,
  Text,
  Button,
  Flex,
} from "@radix-ui/themes";
import {
  useCreateJobMutation,
  useEditJobMutation,
  useGetJobQuery,
} from "../services/jobsApi";
import { useParams } from "react-router";
import { useEffect } from "react";

interface Inputs {
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
  const params = useParams<{ id: string; mode: "add" | "edit" }>();
  const mode = params.mode;
  const id = params.id;

  const { data: job, isLoading } = useGetJobQuery(
    { id },
    { skip: mode === "add" },
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const [createJob] = useCreateJobMutation();
  const [editJob] = useEditJobMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(job);
    switch (mode) {
      case "add":
        createJob(data);
        break;
      case "edit":
        editJob({ id, data });
    }
  };

  useEffect(() => {
    if (mode === "edit" && job) {
      reset({
        company: job.company,
        position: job.position,
        description: job.description,
        salaryFrom: job.salaryFrom,
        salaryTo: job.salaryTo,
        type: job.type as "part-time" | "full-time" | "internship",
        city: job.city,
        homeOffice: job.homeOffice === 0 ? false : true,
      });
    }
  }, [job, isLoading, mode, reset]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Form.Root className="space-y-4 p-4" onSubmit={handleSubmit(onSubmit)}>
      <Form.Field {...register("company")}>
        <Text as="label" size="2" weight="bold">
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
      <Form.Field {...register("position")}>
        <Text as="label" size="2" weight="bold">
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
      <Form.Field {...register("description")}>
        <Text as="label" size="2" weight="bold">
          Leírás
        </Text>
        <Form.Control asChild>
          <TextField.Root type="text" />
        </Form.Control>
        {errors.description && (
          <Form.Label className="text-sm text-red-500">
            {errors.description.message ?? "Nem megfelelő érték"}
          </Form.Label>
        )}
      </Form.Field>
      <Form.Field {...register("salaryFrom", { valueAsNumber: true })}>
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
      <Form.Field {...register("salaryTo", { valueAsNumber: true })}>
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
                  <Select.Item value="full-time">Teljes munkaidős</Select.Item>
                  <Select.Item value="part-time">Részmunkaidős</Select.Item>
                  <Select.Item value="internship">Gyakornoki munka</Select.Item>
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
      <Form.Submit asChild>
        <Button size="3" variant="outline">
          Küldés
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default AdvertisementForm;
