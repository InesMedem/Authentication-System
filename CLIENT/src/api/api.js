import axios from "axios";

const APIGeneral = axios.create({
  //  https://authentication-system-seven.vercel.app
  baseURL: "http://localhost:3001",
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

const resetPassword = async (formData) => {
  return APIGeneral.post("/resetpassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

export { registerUser, loginUser, resetPassword };
