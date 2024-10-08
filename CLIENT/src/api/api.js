import axios from "axios";

const updateToken = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const parseUser = JSON.parse(user);
    return parseUser.token;
  }
};

const APIGeneral = axios.create({
  //  http://localhost:3001
  baseURL: "https://authentication-system-seven.vercel.app",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${updateToken()}`,
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

const getPasscode = async (formData) => {
  return APIGeneral.patch("/getpasscode", formData)
    .then((res) => res)
    .catch((error) => error);
};

const resetPassword = async (formData) => {
  return APIGeneral.patch("/changepassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

const changeName = async (formData) => {
  return APIGeneral.patch("/changename", formData)
    .then((res) => res)
    .catch((error) => error);
};

const changeImg = async (formData) => {
  console.log("entering api");

  return APIGeneral.patch("/changeimg", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

const deleteUser = async () => {
  return APIGeneral.delete("/deleteuser")
    .then((res) => res)
    .catch((error) => error);
};

export {
  registerUser,
  loginUser,
  getPasscode,
  resetPassword,
  changeName,
  deleteUser,
  changeImg,
};
