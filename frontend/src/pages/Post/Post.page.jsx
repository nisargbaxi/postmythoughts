import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Text } from "@mantine/core";
import { useAsyncValue, useLoaderData, defer } from "react-router-dom";
import PageContent from "../../components/misc/PageContent";

export const PostPage = () => {
  const data = useLoaderData();
  return (
    <PageContent promise={data.posts}>
      <PostList />
    </PageContent>
  );
};

function PostList() {
  const { data } = useAsyncValue();
  return (
    <Container>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Thoughts from other people,{" "}
      </Text>
      <SimpleGrid cols={3} mt={20}>
        {data?.map((item, index) => (
          <ArticleCardImage key={index} {...item} />
        ))}
      </SimpleGrid>
    </Container>
  );
}

export const postsLoader = async () => {
  const promise = axios.get(`${DOMAIN}/api/posts/`);
  return defer({
    posts: promise,
  });
};
