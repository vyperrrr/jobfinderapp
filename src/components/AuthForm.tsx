import * as Form from "@radix-ui/react-form";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, TextArea, TextField } from "@radix-ui/themes";

import { useNavigate, useParams } from "react-router";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/authApi";
import { login } from "../features/authSlice";
import { useDispatch } from "react-redux";

type Inputs = {
  email: string;
  password: string;
  confirmPassword?: string;
  fullname: string;
  role: "company" | "jobseeker";
  experiences?: string;
};

const AuthForm = () => {
  const navigate = useNavigate();

  const params = useParams<{ mode: string }>();
  const mode = params.mode;

  const { register, handleSubmit, watch } = useForm<Inputs>();
  const role = watch("role");

  const dispatch = useDispatch();

  const [loginUser, { data: loginData, isSuccess: loginSuccess }] =
    useLoginUserMutation();

  const [registerUser, { data: registerData, isSuccess: registerSuccess }] =
    useRegisterUserMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (mode === "login") handleLogin(data);
    if (mode === "register") handleRegister(data);
  };

  const handleLogin = async (data: Inputs) => {
    const { email, password } = data;
    await loginUser({ email, password });
    if (loginSuccess) {
      console.log(loginData);
      dispatch(login({ user: loginData.user, token: loginData.accessToken }));
      navigate("/");
    }
  };

  const handleRegister = async (data: Inputs) => {
    const { email, password, fullname, role } = data;
    await registerUser({ email, password, fullname, role });
    if (registerSuccess) {
      navigate("/");
    }
  };

  return (
    <Form.Root className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
      {mode === "register" && (
        <Form.Field {...register("fullname")}>
          <Form.Label>Teljes név</Form.Label>
          <Form.Control asChild>
            <TextField.Root />
          </Form.Control>
        </Form.Field>
      )}
      <Form.Field {...register("email")}>
        <Form.Label>Email cím</Form.Label>
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
              <select defaultValue="jobseeker">
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
