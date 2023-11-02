const DOMAIN = import.meta.env.VITE_ENDPOINT
  ? import.meta.env.VITE_ENDPOINT
  : "http://localhost:8080";

export default DOMAIN;
