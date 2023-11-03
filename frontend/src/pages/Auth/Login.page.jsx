import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";
import PageLoader from "../../components/misc/PageLoader";
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
import { modals } from "@mantine/modals";

function LoginPage() {
  const navigate = useNavigate();
  const { loginService, authLoading, user, error } = useBoundStore(
    (state) => state
  );
  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
    if (error) {
      modals.open({
        title: "Sorry, something went wrong.",
        children: (
          <>
            <p style={{ color: "red" }}>Login failed, please try again.</p>
            <Button
              variant="default"
              onClick={() => {
                modals.closeAll();
              }}
              mt="md"
            >
              Close
            </Button>
          </>
        ),
      });
    }
  }, [user, error]);

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
            placeholder="abc@xyz.com"
            required
            name="email"
            type="email"
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            name="password"
            type="password"
          />
          <Button type="submit" fullWidth mt="xl">
            Sign in
          </Button>
          {authLoading && <PageLoader />}
        </Paper>
      </form>
    </Container>
  );
}

export default LoginPage;
