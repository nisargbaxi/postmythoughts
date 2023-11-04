import { Container, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import useBoundStore from "../../store/Store";

const Landing = () => {
  const { user } = useBoundStore((state) => state);
  return (
    <Container>
      {!user && (
        <h1>
          Welcome to the PostMyThoughts. This App is for all people who wants to
          share their thoughts.
        </h1>
      )}
      {user && (
        <>
          <Container>
            <h1>This is your home page to see other people's thoughts.</h1>
            <Button>
              <Link to="/posts">Back to Thoughts</Link>
            </Button>
          </Container>
        </>
      )}
    </Container>
  );
};

export default Landing;
