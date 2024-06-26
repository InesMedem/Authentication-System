import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (id, email) => {
  if (!id || !email) {
    throw new Error("Email or id are missing");
  }

  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

const verifyToken = (token) => {
  if (!token) {
    throw new Error("Token is missing");
  }

  return jwt.verify(token, process.env.JWT_SECRET);
};

export { generateToken, verifyToken };
