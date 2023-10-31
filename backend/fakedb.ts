import { Response } from "express";

export interface IDecodedUser {
  id: number;
}

export const users = [
  {
    id: 1,
    email: "nisargbaxi@gmail.com",
    password: "123",
    name: "Nisarg Baxi",
    about: "I'm a software engineer",
  },
  {
    id: 2,
    email: "ishanibaxi@gmail.com",
    password: "123",
    name: "Ishani Baxi",
    about: "I'm also a software engineer and proud mother !!",
  },
];

export const posts = [
  {
    id: 1,
    title: "Bird",
    category: "nature",
    content:
      "Belted Kingfishers are large-headed birds with a shaggy crest on the back of the head.",
    image:
      "https://cdn.pixabay.com/photo/2017/02/07/16/47/kingfisher-2046453_640.jpg",
    userId: 1,
  },
  {
    id: 2,
    title: "Beautiful BC",
    category: "nature",
    content: "BC is a province full of beauty at every corner.",
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    userId: 2,
  },
];

export const createUser = (user: any) => {
  user.id = users.length + 1;
  users.push(user);
};

export const addPost = (addRequest: any) => {
  addRequest.post.id = posts.length + 1;
  addRequest.user.userId = addRequest.user.id;
  posts.push(addRequest.post);
};

export const editPost = (editRequest: any) => {
  const index = posts.findIndex((p) => p.id == editRequest.post.id);
  if (editRequest.post.title) posts[index].title = editRequest.post.title;
  if (editRequest.post.content) posts[index].content = editRequest.post.content;
  if (editRequest.post.image) posts[index].image = editRequest.post.image;
  if (editRequest.post.category)
    posts[index].category = editRequest.post.category;
};

export const verifyUser = (email: string, password: string) => {
  const user = users.find((user) => {
    return user.email === email && user.password === password;
  });
  if (!user) throw new Error("User not found");
  return user;
};

export const findUserById = (id: number) => {
  const user = users.find((user) => user.id === id);
  if (!user) throw new Error("User not found");
  return user;
};

export const parseToken = (authHeader: string | undefined, res: Response) => {
  if (!authHeader) {
    res.status(403).send("Header does not exist");
    return "";
  }
  return authHeader.split(" ")[1];
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
