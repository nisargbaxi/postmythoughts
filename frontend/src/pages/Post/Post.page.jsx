import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, Center } from "@mantine/core";
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
    <SimpleGrid cols={3}>
      {data?.map((item) => (
        <ArticleCardImage key={item.title} {...item} />
      ))}
    </SimpleGrid>
  );
}

export const postsLoader = async () => {
  const promise = axios.get(`${DOMAIN}/api/posts/`);
  return defer({
    posts: promise,
  });
};
