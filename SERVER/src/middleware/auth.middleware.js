import dotenv from "dotenv";
import { verifyToken } from "../utils/token.js";
import User from "../api/models/User.model.js";
dotenv.config();

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return next(new Error("Unauthorized"));
  }

  try {
    const decoded = verifyToken(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(error);
  }
};

export { isAuth };
