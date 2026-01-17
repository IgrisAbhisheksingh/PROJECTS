import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.listen(3030, () => console.log("Server is running on port 3030"));

 
import mongoose from "mongoose";
mongoose.connect(process.env.DB_URL)
    .then(() => console.log("Database connected"))
    .catch(() => console.log("Database not connected"));

 
import cookieParser from "cookie-parser";
import cors from "cors";
app.use(cookieParser());
app.use(cors({
    origin: process.env.DOMAIN
}));

import morgan from "morgan";
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

 
import userRouter from "./user/user.routes.js";
app.use("/api/user", userRouter);
