import { Paper, Text, Title, Button, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./ArticleCardImage.module.css";
import { FcLike } from "react-icons/fc";

export function ArticleCardImage({ title, category, image, id, likes }) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <Button variant="white" color="dark">
        <Link to={id.toString()}>View</Link>
      </Button>
      <div>
        <Text className={classes.likes} size="xs">
          <FcLike size={20} style={{ marginRight: 5, marginBottom: -5 }} />
          {likes}
        </Text>
      </div>
    </Paper>
  );
}
