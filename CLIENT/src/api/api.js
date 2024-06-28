import axios from "axios";

const APIGeneral = axios.create({
  baseURL: "https://authentication-system-seven.vercel.app",
  // timeout: 600,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const registerUser = async (formData) => {
  return APIGeneral.post("/auth/register", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

const loginUser = async (formData) => {
  return APIGeneral.post("/auth/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

export { registerUser, loginUser };
