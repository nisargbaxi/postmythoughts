import Layout from "./components/misc/Layout";
import LoginPage from "./pages/Auth/Login.page";
import About from "./pages/About/About.page";
import Landing from "./pages/Landing/Landing.page";
import NotFound from "./pages/Notfound/NotFound.page";
import CreatePostPage from "./pages/Post/CreatePost.page";
import Register from "./pages/Register/Register.page";
import ProtectedRoute from "./services/ProtectedRoute";
import useBoundStore from "./store/Store";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import { PostPage, postsLoader } from "./pages/Post/Post.page";
import { postDetailsLoader } from "./pages/Post/PostDetails.page";
import PostDetailsPage from "./pages/Post/PostDetails.page";
import { UserList } from "./pages/Users/UserList.page";
import { editPostPageLoader } from "./pages/Post/EditPost.page";
import EditPostPage from "./pages/Post/EditPost.page";
import { userPageLoader } from "./pages/Users/UserList.page";

export const Router = () => {
  const authCheck = useBoundStore((state) => {
    return state.user ? state.user : false;
  });

  /**
   * CLIENT-SIDE ROUTER
   *
   * [Public Pages]: Anyone can see these pages
   * / - Landing Page
   *
   * [Private Routes]: Must be authenticated to see
   * /login - Login Page
   * /posts - See All Posts
   * /posts/:id - See details of a specific post
   * /posts/create - Create a post
   *
   * /<unknown> - 404 Not Found
   */
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/allusers"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <UserList />
            </ProtectedRoute>
          }
          loader={userPageLoader}
        />
        <Route
          path="/posts/create"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostPage />
            </ProtectedRoute>
          }
          loader={postsLoader}
        />
        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostDetailsPage />
            </ProtectedRoute>
          }
          loader={postDetailsLoader}
        />
        <Route
          path="/posts/edit/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <EditPostPage />
            </ProtectedRoute>
          }
          loader={editPostPageLoader}
        />
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return router;
};
