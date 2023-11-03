import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  PasswordInput,
  Container,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import { modals } from "@mantine/modals";
import { useState } from "react";
import PageLoader from "../../components/misc/PageLoader";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      about: "",
    },
    validate: {
      name: (value) =>
        value.trim().length > 2
          ? null
          : "Name should be alteast of 2 character.",
      password: (value) =>
        value.trim().length >= 8
          ? null
          : "Invalid password. It should be 8 character long",
      email: (value) => (!/^\S+@\S+$/.test(value) ? "Invalid Email" : null),
    },
  });

  const handleSubmit = async (values, e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log("waiting for 5 seconds before registration....");
    }, 15000);
    const res = await axios
      .post(`${DOMAIN}/api/user/register`, values)
      .finally(() => {
        setLoading(false);
      });
    if (res?.data.success) {
      modals.open({
        title: "Registration successful.",
        children: (
          <>
            <p>
              Signup successful, please check your email to confirm your account
              and login with your credentials and start spreading your
              thoughts...
            </p>
            <Button
              fullWidth
              onClick={() => {
                modals.closeAll();
                navigate("/login");
              }}
              mt="md"
            >
              Close
            </Button>
          </>
        ),
      });
    } else {
      alert("Error registering the user.");
    }
  };

  return (
    <Container>
      {loading && <PageLoader />}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Title
          order={2}
          size="h1"
          style={{ fontFamily: "Greycliff CF, var(--mantine-font-family)" }}
          fw={900}
          ta="center"
        >
          Register to spread your thoughts..
        </Title>

        <SimpleGrid cols={{ base: 1, sm: 2 }} mt="xl">
          <TextInput
            label="Name"
            placeholder="Your name"
            name="name"
            variant="filled"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            required
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your Password"
            name="password"
            variant="filled"
            required
            {...form.getInputProps("password")}
          />
        </SimpleGrid>
        <Textarea
          mt="md"
          label="About your self"
          placeholder="About your self"
          maxRows={10}
          minRows={5}
          autosize
          name="about"
          variant="filled"
          {...form.getInputProps("about")}
        />

        <Group justify="center" mt="xl">
          <Button type="submit" size="md">
            Register
          </Button>
        </Group>
      </form>
    </Container>
  );
}
