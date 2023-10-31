import { Container, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import useBoundStore from "../../store/Store";

const Landing = () => {
  const { user } = useBoundStore((state) => state);
  return (
    <Container>
      {!user && <h1>Welcome to the homepage. Anyone can see this page</h1>}
      {user && (
        <>
          <Container>
            <h1>This is your home page to see other people's thoughts.</h1>
            <Button>
              <Link to="/posts">Back to Posts</Link>
            </Button>
          </Container>
        </>
      )}
    </Container>
  );
};

export default Landing;
