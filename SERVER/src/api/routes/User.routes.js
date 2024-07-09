import express from "express";
import {
  login,
  register,
  resetPassword,
} from "../controllers/User.controllers.js";
import { upload } from "../../middleware/files.middleware.js";
import { isAuth } from "../../middleware/auth.middleware.js";

const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/login", login);
UserRoutes.post("/resetpassword", resetPassword);
console.log("🚀 ~ resetPassword:", resetPassword);

//! ---------------- endPoints con auth -----------------------------

UserRoutes.patch("/changepassword", [isAuth]);

export default UserRoutes;
