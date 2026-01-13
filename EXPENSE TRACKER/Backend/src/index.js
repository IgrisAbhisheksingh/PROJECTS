import express from "express";
import morgan from "morgan";
import userRouter from "./user/user.route.js";

const app = express();

// app-level middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => res.json({ message: "Setup Success" }));
app.use("/api/user", userRouter);

// server
app.listen(3030, () => console.log("server is running on port 3030"));
