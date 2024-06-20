import express from "express";
import { login, register } from "../controllers/User.controllers.js";
import { upload } from "../../middleware/files.middleware.js";

const UserRoutes = express.Router();

UserRoutes.post("/register", upload.single("image"), register);
UserRoutes.post("/login", login);

export default UserRoutes;
