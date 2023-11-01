import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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
  Center,
  SimpleGrid,
  rem,
  Table,
  TableTr,
  TableTd,
} from "@mantine/core";
import classes from "./PostDetails.module.css";
import { Hourglass } from "react-loader-spinner";

const PRIMARY_COL_HEIGHT = rem(440);

function PostDetailsPage() {
  const { id } = useParams();
  const { user } = useBoundStore((state) => state);
  const navgiate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${DOMAIN}/api/posts/${id}`)
      .then((response) => {
        setTimeout(() => {
          setData(response.data);
          setLoading(false);
        }, 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleEditClick = (id) => {
    navgiate("/posts/edit/" + id);
  };
  return (
    <>
      <Container my="md">
        {loading && (
          <Center>
            <Hourglass
              visible={true}
              height="80"
              width="80"
              ariaLabel="hourglass-loading"
              wrapperStyle={{}}
              wrapperClass=""
              colors={["#306cce", "#72a1ed"]}
            />
          </Center>
        )}
        {!loading && (
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
                        <Text
                          fw={500}
                          fz="lg"
                          c="dimmed"
                          className={classes.label}
                        >
                          <b>Author : </b>
                          {data.user.name}
                        </Text>
                      </TableTd>
                    </TableTr>
                    <TableTr>
                      <TableTd>
                        <Text
                          fw={500}
                          fz="lg"
                          c="dimmed"
                          className={classes.label}
                        >
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
        )}
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  return null;
};

export default PostDetailsPage;
