import {
  TextInput,
  Textarea,
  SimpleGrid,
  Group,
  Title,
  Button,
  PasswordInput,
  Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DOMAIN from "../../services/endpoint";

export default function Register() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      about: "",
    },
    validate: {
      name: (value) => value.trim().length < 2,
      password: (value) => value.trim().length < 8,
      email: (value) => !/^\S+@\S+$/.test(value),
    },
  });

  const handleSubmit = async (values) => {
    const res = await axios.post(`${DOMAIN}/api/user/register`, values);
    if (res?.data.success) {
      navigate("/posts");
    } else {
      alert("Error registering the user.");
    }
  };

  return (
    <Container>
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
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Email"
            placeholder="Your email"
            name="email"
            variant="filled"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your Password"
            name="password"
            variant="filled"
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
