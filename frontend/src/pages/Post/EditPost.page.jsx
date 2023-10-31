import { TextInput, Button, Group, Box, VisuallyHidden } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useForm } from "@mantine/form";
import { useLoaderData, useNavigate } from "react-router-dom";

function EditPostPage() {
  const navigate = useNavigate();
  const data = useLoaderData();
  const form = useForm({
    initialValues: {
      id: data.id,
      title: data.title,
      category: data.category,
      image: data.image,
      content: data.content,
    },
  });

  const handleSubmit = async (values) => {
    const res = await axios.put(`${DOMAIN}/api/posts`, values);
    if (res?.data.success) {
      navigate("/posts");
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          type="hidden"
          value={data.id}
          name="id"
          {...form.getInputProps("id")}
        />

        <TextInput
          label="Title"
          placeholder="Enter a Title"
          {...form.getInputProps("title")}
        />

        <TextInput
          label="Category"
          placeholder="Enter a Category"
          {...form.getInputProps("category")}
        />
        <TextInput
          label="Image"
          placeholder="Enter an Image"
          {...form.getInputProps("image")}
        />

        <TextInput
          label="Content"
          placeholder="Enter some content"
          {...form.getInputProps("content")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Update</Button>
        </Group>
      </form>
    </Box>
  );
}

export const editPostPageLoader = async ({ params }) => {
  const jwtToke = localStorage.getItem();
  const res = await axios.head().get(`${DOMAIN}/api/posts/${params.id}`, {
    headers: {
      authorization: "1",
    },
  });
  return res.data;
};

export default EditPostPage;
