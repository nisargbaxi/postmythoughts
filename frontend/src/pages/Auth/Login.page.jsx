import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import { Hourglass } from "react-loader-spinner";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "./Login.module.css";

function LoginPage() {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);
  const [emailError, setEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);
  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    let isValid = true;
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };
  return (
    <Container size={420} my={40}>
      <form onSubmit={onLogin}>
        <Title ta="center" className={classes.title}>
          Welcome, please login to continue.
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="you@mantine.dev"
            required
            name="email"
            type="email"
            error={emailError}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            name="password"
            type="password"
            error={passwordError}
          />
          <Group justify="space-between" mt="lg">
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
          {authLoading && (
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
          )}
        </Paper>
      </form>
    </Container>
  );
}

export default LoginPage;
