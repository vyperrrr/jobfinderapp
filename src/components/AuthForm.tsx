import * as Form from "@radix-ui/react-form";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextArea, TextField } from "@radix-ui/themes";

import { useParams } from "react-router";

type Inputs = {
  username: string;
  password: string;
  passwordAgain?: string;
  role?: "company" | "jobseeker";
  experiences?: string;
};

const AuthForm = () => {
  const params = useParams<{ mode: string }>();
  const mode = params.mode;

  const { register, handleSubmit, watch } = useForm<Inputs>();

  const role = watch("role");

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <Form.Root className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <Form.Field {...register("username")}>
        <Form.Label>Felhasználónév</Form.Label>
        <Form.Control asChild>
          <TextField.Root />
        </Form.Control>
      </Form.Field>
      <Form.Field {...register("password")}>
        <Form.Label>Jelszó</Form.Label>
        <Form.Control asChild>
          <TextField.Root />
        </Form.Control>
      </Form.Field>
      {mode === "register" && (
        <>
          <Form.Field {...register("passwordAgain")}>
            <Form.Label>Jelszó újra</Form.Label>
            <Form.Control asChild>
              <TextField.Root />
            </Form.Control>
          </Form.Field>
          <Form.Field {...register("role")}>
            <Form.Label>Regisztráció mint</Form.Label>
            <Form.Control asChild>
              <select>
                <option value="jobseeker">Munkavállaló</option>
                <option value="company">Munkáltató</option>…
              </select>
            </Form.Control>
          </Form.Field>
          {role === "jobseeker" && (
            <Form.Field {...register("experiences")}>
              <Form.Label>Munkatapasztalatok</Form.Label>
              <Form.Control asChild>
                <TextArea placeholder="Munkahely;Pozíció;Mettől-meddig" />
              </Form.Control>
            </Form.Field>
          )}
        </>
      )}
      <Form.Submit asChild>
        <Button variant="soft">
          {mode === "register" ? "Regisztráció" : "Bejelentkezés"}
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};

export default AuthForm;
