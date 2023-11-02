import DOMAIN from "../services/endpoint";
import axios from "axios";

const PostStore = (set, get) => ({
  loading: true,
  data: null,
  error: null,
  addPost: async (post) => {
    try {
      const res = await axios.post(`${DOMAIN}/api/posts`, post);
      if (res.data) {
        set({ data: res.data, loading: false, error: null });
      } else {
        set({
          loading: false,
          data: null,
          error: "Unable to add the post. Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      set({ loading: false, data: null, error: error });
    }
  },

  deletePost: async (id) => {
    try {
      const res = await axios.delete(`${DOMAIN}/api/posts/delete/${id}`);
      if (res.data) {
        set({ data: res.data, loading: false, error: null });
      } else {
        set({
          loading: false,
          data: null,
          error: "Unable to delete the post. Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      set({ loading: false, data: null, error: error });
    }
  },

  getPosts: async () => {
    try {
      const res = await axios.get(`${DOMAIN}/api/posts`);
      if (res.data) {
        set({ data: res.data, loading: false, error: null });
      } else {
        set({
          loading: false,
          data: null,
          error: "Unable to read the data. Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      set({ loading: false, data: null, error: error });
    }
  },

  getPost: async (id) => {
    try {
      const res = await axios.get(`${DOMAIN}/api/posts/${id}`);
      if (res.data) {
        set({ data: res.data, loading: false, error: null });
      } else {
        set({
          loading: false,
          data: null,
          error: "Unable to read the data. Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      set({ loading: false, data: null, error: error });
    }
  },

  editPost: async (post) => {
    try {
      const res = await axios.put(`${DOMAIN}/api/posts`, post);
      if (res.data) {
        set({ data: res.data, loading: false, error: null });
      } else {
        set({
          loading: false,
          data: null,
          error: "Unable to read the data. Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      set({ loading: false, data: null, error: error });
    }
  },
});

export default PostStore;
