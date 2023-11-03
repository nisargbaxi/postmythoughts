import DOMAIN from "../services/endpoint";
import axios from "axios";
import { setSession } from "../services/jwt.service";

const createAuthStore = (set, get) => ({
  user: null,
  authLoading: false,
  tokenLoading: true,
  error: null,
  setUser: (args) => set({ user: args }),
  logoutService: () => {
    setSession(null);
    set({ user: null, authLoading: false, tokenLoading: false, error: null });
  },
  loginService: async (email, password) => {
    set({ authLoading: true, error: null });
    try {
      const res = await axios.post(`${DOMAIN}/api/user/login`, {
        email,
        password,
      });
      if (res.data.result?.user && res.data.result?.token) {
        setSession(res.data.result?.token);
        set({ user: res.data.result?.user, authLoading: false, error: null });
      } else {
        set({ authLoading: false, user: null, error: "Unable to login!" });
      }
    } catch (error) {
      console.log(error);
      set({ authLoading: false, error: error });
    }
  },
  loginWithToken: async () => {
    try {
      const res = await axios.post(`${DOMAIN}/api/user/validation`);
      if (res.data.result?.user && res.data.result?.token) {
        setSession(res.data.result?.token);
        set({ user: res.data.result?.user, tokenLoading: false });
      } else {
        set({ tokenLoading: false, user: null, error: "Unable to login.." });
      }
    } catch (error) {
      console.log(error);
      get().logoutService();
    }
  },
});

export default createAuthStore;
