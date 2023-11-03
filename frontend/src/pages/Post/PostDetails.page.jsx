import { Link, defer, useAsyncValue, useLoaderData } from "react-router-dom";
import React from "react";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import useBoundStore from "../../store/Store";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Paper,
  Text,
  Group,
  Button,
  SimpleGrid,
  rem,
  Table,
  TableTr,
  TableTd,
} from "@mantine/core";
import classes from "./PostDetails.module.css";
import PageContent from "../../components/misc/PageContent";

function PostDetailsPage() {
  const data = useLoaderData();
  return (
    <PageContent promise={data.post}>
      <PostDetail />
    </PageContent>
  );
}

function PostDetail() {
  const { user } = useBoundStore((state) => state);
  const { data } = useAsyncValue();
  const navgiate = useNavigate();
  const handleEditClick = (id) => {
    navgiate("/posts/edit/" + id);
  };
  return (
    <>
      <Group mt="md" style={{ padding: 10, margin: 10 }}>
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
        {user.id == data.post.userId && (
          <>
            <Button
              variant="default"
              onClick={() => handleEditClick(data.post.id)}
            >
              Edit
            </Button>
          </>
        )}
      </Group>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        <Card withBorder radius="md" className={classes.card}>
          <Group justify="space-between" mt="md">
            <Table>
              <TableTr>
                <TableTd>
                  <Text fw={500} fz="lg" c="dimmed" className={classes.label}>
                    <b>Author : </b>
                    {data.user.name}
                  </Text>
                </TableTd>
              </TableTr>
              <TableTr>
                <TableTd>
                  <Text fw={500} fz="lg" c="dimmed" className={classes.label}>
                    <b>Author : </b>
                    {data.post.title}
                  </Text>
                </TableTd>
              </TableTr>
              <TableTr>
                <TableTd>
                  <Text fz="lg" c="dimmed" className={classes.label}>
                    <b>Category :</b> {data.post.category}
                  </Text>
                </TableTd>
              </TableTr>
              <TableTr>
                <TableTd>
                  <Text fz="lg" c="dimmed" className={classes.label}>
                    <b>Content :</b> {data.post.content}
                  </Text>
                </TableTd>
              </TableTr>
            </Table>
          </Group>
        </Card>
        <Paper
          shadow="md"
          p="xl"
          radius="md"
          style={{ backgroundImage: `url(${data.post.image})` }}
          className={classes.card}
        >
          <div></div>
        </Paper>
      </SimpleGrid>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const promise = axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return defer({
    post: promise,
  });
};

export default PostDetailsPage;
