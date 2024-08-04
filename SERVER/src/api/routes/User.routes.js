import express from "express";
import {
  login,
  register,
  getPasscode,
  loginPasscode,
  modifyPassword,
  changeName,
  deleteUser,
  getAll,
} from "../controllers/User.controllers.js";
import { upload } from "../../middleware/files.middleware.js";
import { isAuth } from "../../middleware/auth.middleware.js";

const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/login", login);
UserRoutes.patch("/getpasscode", getPasscode); // operation involves updating an existing resource, this is why its patch
UserRoutes.get("/getAll", getAll);

//! ---------------- endPoints con auth -----------------------------

UserRoutes.patch("/changepassword", [isAuth], modifyPassword);
UserRoutes.patch("/changename", [isAuth], changeName);
UserRoutes.delete("/deleteuser", [isAuth], deleteUser);

//! ---------------- endPoints redirect -----------------------------

UserRoutes.patch("/loginPasscode/:id", loginPasscode); // only internal url fore redirect

export default UserRoutes;
