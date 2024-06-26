import express from "express";
import { login, register } from "../controllers/User.controllers.js";
import { upload } from "../../middleware/files.middleware.js";
import { isAuth } from "../../middleware/auth.middleware.js";

const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/login", login);
//resend code
//forgot password etc

//! ---------------- endPoints con auth -----------------------------

// change password
// update
UserRoutes.patch("/changepassword", [isAuth]);

export default UserRoutes;
