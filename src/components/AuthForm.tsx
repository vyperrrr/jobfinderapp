import * as Form from "@radix-ui/react-form";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextArea, TextField } from "@radix-ui/themes";

import { useParams } from "react-router";
import { useLoginUserMutation } from "../services/authApi";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";

type Inputs = {
  email: string;
  password: string;
  confirmPassword?: string;
  role?: "company" | "jobseeker";
  experiences?: string;
};

const AuthForm = () => {
  const params = useParams<{ mode: string }>();
  const mode = params.mode;

  const { register, handleSubmit, watch } = useForm<Inputs>();
  const role = watch("role");

  const dispatch = useDispatch();

  const [
    loginUser,
    {
      data: loginData,
      isError: isLoginError,
      isSuccess: isLoginSuccess,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (mode === "login") {
      const { email, password } = data;
      loginUser({ email, password });
      if (isLoginSuccess) {
      }
    }
  };

  return (
    <Form.Root className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <Form.Field {...register("email")}>
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
          <Form.Field {...register("confirmPassword")}>
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
