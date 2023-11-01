import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { useState, useEffect } from "react";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Center } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { Hourglass } from "react-loader-spinner";

export const PostPage = () => {
  const posts = useLoaderData();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${DOMAIN}/api/posts`)
      .then((response) => {
        setTimeout(() => {
          setData(response.data);
          setLoading(false);
        }, 100);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
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
        <SimpleGrid cols={3}>
          {data?.map((item) => (
            <ArticleCardImage key={item.title} {...item} />
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
};

export const postsLoader = async () => {
  return null;
};
