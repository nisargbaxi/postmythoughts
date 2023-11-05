import { Paper, Text, Title, Button, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from "./ArticleCardImage.module.css";
import { FcLike } from "react-icons/fc";
import useBoundStore from "../../store/Store";
import { useEffect, useState } from "react";
import axios from "axios";
import { modals } from "@mantine/modals";
import DOMAIN from "../../services/endpoint";

export function ArticleCardImage({ title, category, image, id, likes }) {
  const [like, setLike] = useState(likes);

  const handleLikeEvent = (id) => {
    axios
      .put(`${DOMAIN}/api/posts/like`, { id: id })
      .then((resposne) => {
        setLike(resposne.data.likes);
      })
      .catch((error) => {
        modals.open({
          title: "Error in likeing the post",
          children: (
            <>
              <p style={{ color: "red" }}>{error}</p>
              <Button
                variant="default"
                onClick={() => {
                  modals.closeAll();
                }}
                mt="md"
              >
                Close
              </Button>
            </>
          ),
        });
      });
  };

  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className={classes.card}
      id={id}
    >
      <div>
        <Text className={classes.category} size="xs">
          {category}
        </Text>
        <Title order={3} className={classes.title}>
          {title}
        </Title>
      </div>
      <div>
        <Button variant="white" color="dark">
          <Link to={id.toString()}>View</Link>
        </Button>

        <Text className={classes.likes} size="xs">
          <FcLike
            size={20}
            style={{ marginRight: 5, marginBottom: -5, cursor: "pointer" }}
            onClick={() => handleLikeEvent(id)}
          />
          {like}
        </Text>
      </div>
    </Paper>
  );
}
