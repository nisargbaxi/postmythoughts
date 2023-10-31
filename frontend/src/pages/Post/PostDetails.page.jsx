import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
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
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  rem,
  GridCol,
} from "@mantine/core";
import classes from "./PostDetails.module.css";

const PRIMARY_COL_HEIGHT = rem(440);

function PostDetailsPage() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  const { user } = useBoundStore((state) => state);
  const post = useLoaderData();
  const navigate = useNavigate();

  const handleEditClick = (id) => {
    navigate("/posts/edit/" + id);
  };
  return (
    <>
      <Container my="md">
        <Group mt="md" style={{ padding: 10, margin: 10 }}>
          <Button>
            <Link to="/posts">Back to Posts</Link>
          </Button>
          {user.id == post.userId && (
            <>
              <Button
                variant="default"
                onClick={() => handleEditClick(post.id)}
              >
                Edit
              </Button>
            </>
          )}
        </Group>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
          <Card withBorder radius="md" className={classes.card}>
            <Group justify="space-between" mt="md">
              <div>
                <Text fw={500} fz="sm" c="dimmed" className={classes.label}>
                  <b>Title :</b>
                  {post.title}
                </Text>
                <Text fz="sm" c="dimmed" className={classes.label}>
                  <b>Category :</b> {post.category}
                </Text>
                <Text fz="sm" c="dimmed" className={classes.label}>
                  <b>Content :</b> {post.content}
                </Text>
                <Text fz="sm" c="dimmed" className={classes.label}>
                  <b>User ID :</b> {post.userId}
                </Text>
              </div>
            </Group>
          </Card>
          <Paper
            shadow="md"
            p="xl"
            radius="md"
            style={{ backgroundImage: `url(${post.image})` }}
            className={classes.card}
          >
            <div></div>
          </Paper>
        </SimpleGrid>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  console.log("Parms : " + params.id);
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  return res.data;
};

export default PostDetailsPage;
