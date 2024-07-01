import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connect } from "./src/utils/db.js";
import { configCloudinary } from "./src/middleware/files.middleware.js";
import UserRoutes from "./src/api/routes/User.routes.js";

//! create express app
const app = express();

//! Initialize environment variables
dotenv.config();

//! Connect to the database
connect();

configCloudinary();

const PORT = process.env.PORT;
// const MONGO_URI = process.env.MONGO_URI;

app.use(cors());

//! Apply middleware
// app.use(cors());

app.use(
  cors({
    origin: "https://authentication-system-ltp2.vercel.app",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true, // Include credentials if required
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

//! ROUTES
app.use("/", UserRoutes);

app.get("/", (req, res) => res.send("Express on Vercel"));

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
