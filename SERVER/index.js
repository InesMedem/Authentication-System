import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connect } from "./src/utils/db.js";
import { configCloudinary } from "./src/middleware/files.middleware.js";

//! Initialize environment variables
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

//! create express app
const app = express();

//! Apply middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
configCloudinary();

//! Connect to the database
connect();

//! ROUTES
import UserRoutes from "./src/api/routes/User.routes.js";
app.use("/api/v1/user/", UserRoutes);

app.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
});

//! Error handling middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

//! Start server
app.listen(PORT, () =>
  console.log(`Server listening on port 👌🔍 http://localhost:${PORT}`)
);
