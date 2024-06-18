import axios from "axios";

const instance = axios.creat({
  baseURL: "http://localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
