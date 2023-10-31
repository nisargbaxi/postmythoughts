import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
  editPost,
  createUser,
  users,
} from "./fakedb";
import { userInfo } from "os";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/register", (req, res) => {
  try {
    const user = req.body;
    console.log(user.about);
    createUser({
      id: 0,
      name: user.name,
      email: user.email,
      password: user.password,
      about: user.about,
    });

    res.json({ success: true });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  sleep(15000);
  res.json(posts);
});

app.get("/api/allusers", async (req, res) => {
  sleep(15000);
  res.json(users);
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  sleep(15000);
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    if (!user) {
      throw "User not authenticated.";
    }
    const id = parseInt(req.params.id);
    const post = posts.find((p) => p.id === id);
    if (!post) {
      res.status(401).json({ error: "Post not found." });
    } else {
      res.json(post);
    }
  } catch (error) {
    res.status(401).json({ error });
  }
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    if (!user) {
      throw "User not authenticated.";
    }
    const incomingPost = req.body;
    addPost({ post: incomingPost, user: user });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(401).json({ error });
  }
});

//Edit request.
app.put("/api/posts", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    if (!user) {
      throw "User not authenticated.";
    }
    const incomingPost = req.body;
    editPost({ post: incomingPost });
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.listen(port, () => console.log("Server is running"));
