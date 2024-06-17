import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import { connect } from "./src/utils/db.js";
import { configCloudinary } from "./src/middleware/files.middleware.js";

// create express app
const app = express();

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// connect to db
connect();

// Cloudinary config
configCloudinary();
