import express from "express";
import {
  login,
  register,
  getPasscode,
  loginPasscode,
} from "../controllers/User.controllers.js";
import { upload } from "../../middleware/files.middleware.js";
import { isAuth } from "../../middleware/auth.middleware.js";

const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register); //! image upload not working
UserRoutes.post("/login", login);
UserRoutes.patch("/getpasscode", getPasscode); // operation involves updating an existing resource
UserRoutes.patch("/loginPasscode/:id", loginPasscode);

//! ---------------- endPoints con auth -----------------------------

UserRoutes.patch("/changepassword", [isAuth]);

export default UserRoutes;
