import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./user/user.routes.js";

const app = express();

mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Database connected"))
  .catch(() => console.log("Database not connected"));

app.use(cookieParser());

app.use(cors({
  origin: process.env.DOMAIN, // must match frontend URL
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

app.listen(3030, () => console.log("Server is running on port 3030"));
