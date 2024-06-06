import * as Form from "@radix-ui/react-form";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Flex, Select, Text, TextField } from "@radix-ui/themes";

import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../services/authApi";
import { login } from "./authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Inputs {
  email: string;
  password: string;
  confirmPassword?: string;
  fullname: string;
  role: "company" | "jobseeker";
  experiences?: string;
}

interface Error {
  status: number;
  data: {
    name: string;
    message: string;
    code: number;
    className: string;
  };
}

const AuthForm = () => {
  const navigate = useNavigate();

  const params = useParams<{ mode: string }>();
  const mode = params.mode;

  const { register, handleSubmit, control } = useForm<Inputs>();

  const dispatch = useDispatch();

  const [
    authLogin,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();

  const [
    authRegister,
    {
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      // error: registerError,
    },
  ] = useRegisterUserMutation();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (mode === "login") handleLogin(data);
    if (mode === "register") handleRegister(data);
  };

  const handleLogin = async (data: Inputs) => {
    const { email, password } = data;
    await authLogin({ email, password });
  };

  const handleRegister = async (data: Inputs) => {
    const { email, password, fullname, role } = data;
    await authRegister({ email, password, fullname, role });
  };

  useEffect(() => {
    if (isLoginSuccess) {
      dispatch(login({ user: loginData.user, token: loginData.accessToken }));
      toast.dark("Sikeres bejelentkezés!");
      navigate("/");
    } else if (isLoginError) {
      if ((loginError as Error).status === 401) {
        toast.dark("Hibás email vagy jelszó!");
        console.log(loginError);
      } else {
        toast.dark("Sikertelen bejelentkezés!");
      }
    }
  }, [loginError, isLoginError, isLoginSuccess, dispatch, loginData, navigate]);

  useEffect(() => {
    if (isRegisterSuccess) {
      toast.dark("Sikeres regisztráció!");
      navigate("/auth/login");
    } else if (isRegisterError) {
      toast.error("Sikertelen regisztráció!");
    }
  }, [isRegisterError, isRegisterSuccess, navigate]);

  return (
    <div className="max-w-lg flex-1 rounded-md bg-slate-800 px-6 py-12 md:p-12">
      <div className="flex-1 space-y-10 rounded-md bg-slate-900 p-6 shadow-md">
        <h1 className="text-center text-3xl font-semibold">
          {mode === "register" ? "Regisztráció" : "Bejelentkezés"}
        </h1>
        <Form.Root className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {mode === "register" && (
            <Form.Field {...register("fullname")}>
              <Form.Label className="text-sm font-semibold">
                Teljes név
              </Form.Label>
              <Form.Control asChild>
                <TextField.Root placeholder="A teljes neved..." />
              </Form.Control>
            </Form.Field>
          )}
          <Form.Field {...register("email")}>
            <Form.Label className="text-sm font-semibold">Email</Form.Label>
            <Form.Control asChild>
              <TextField.Root placeholder="Az email címed..." />
            </Form.Control>
          </Form.Field>
          <Form.Field {...register("password")}>
            <Form.Label className="text-sm font-semibold">Jelszó</Form.Label>
            <Form.Control asChild>
              <TextField.Root type="password" placeholder="A jelszavad..." />
            </Form.Control>
          </Form.Field>
          {mode === "register" && (
            <>
              <Form.Field {...register("confirmPassword")}>
                <Form.Label className="text-sm font-semibold">
                  Jelszó újra
                </Form.Label>
                <Form.Control asChild>
                  <TextField.Root
                    type="password"
                    placeholder="A jelszavad mégegyszer..."
                  />
                </Form.Control>
              </Form.Field>
              <Controller
                defaultValue="jobseeker"
                name="role"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Flex direction="column">
                    <Text as="label" size="2" weight="bold">
                      Regisztráció mint
                    </Text>
                    <Select.Root onValueChange={onChange} value={value}>
                      <Select.Trigger />
                      <Select.Content position="popper">
                        <Select.Group>
                          <Select.Label>Szerepek</Select.Label>
                          <Select.Item value="jobseeker">
                            Munkakereső
                          </Select.Item>
                          <Select.Item value="company">Munkáltató</Select.Item>
                        </Select.Group>
                      </Select.Content>
                    </Select.Root>
                  </Flex>
                )}
              />
            </>
          )}
          <Form.Submit className="mt-10" asChild>
            <Button size="3" variant="soft" className="cursor-pointer">
              {mode === "register" ? "Regisztráció" : "Bejelentkezés"}
            </Button>
          </Form.Submit>
        </Form.Root>
      </div>
      <div className="mt-2 flex gap-x-2">
        <p className="text-gray-400">
          {mode === "register" ? "Már van fiókod?" : "Még nincs fiókod?"}
        </p>
        <Link
          to={`/auth/${mode === "register" ? "login" : "register"}`}
          className="cursor-pointer text-blue-400"
        >
          {mode === "register" ? "Jelentkezz be!" : "Regisztrálj egyet!"}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
