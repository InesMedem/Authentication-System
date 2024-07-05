import axios from "axios";

const APIGeneral = axios.create({
  //  http://localhost:3001
  baseURL: "https://authentication-system-seven.vercel.app",
  // timeout: 600,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const registerUser = async (formData) => {
  return APIGeneral.post("/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

const loginUser = async (formData) => {
  return APIGeneral.post("/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

export { registerUser, loginUser };
