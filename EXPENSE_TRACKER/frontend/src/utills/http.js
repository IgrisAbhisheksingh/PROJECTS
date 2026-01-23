import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3030",
  withCredentials: true,
});

export default http;
