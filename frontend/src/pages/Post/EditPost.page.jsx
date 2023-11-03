import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group, Box } from "@mantine/core";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import {
  useNavigate,
  useLoaderData,
  useAsyncValue,
  defer,
} from "react-router-dom";
import PageContent from "../../components/misc/PageContent";

function EditPostPage() {
  const data = useLoaderData();
  return (
    <PageContent promise={data.post}>
      <EditForm />
    </PageContent>
  );
}

function EditForm() {
  const { data } = useAsyncValue();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      id: data.post.id,
      title: data.post.title,
      category: data.post.category,
      image: data.post.image,
      content: data.post.content,
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
          value={data.post.id}
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
          <Button
            variant="light"
            onClick={() => {
              navigate("/posts");
            }}
          >
            Cancel
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export const editPostPageLoader = async ({ params }) => {
  const promise = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return defer({
    post: promise,
  });
};

export default EditPostPage;
