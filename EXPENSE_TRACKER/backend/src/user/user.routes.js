



import { Router } from "express";
import {
  createUser,
  login,
  sendEmail,
  forgotPassword,
  changePassword,
  verifyToken
} from "./user.controller.js";
import { AdminUserGuard, verifyTokenGuard } from "../middleware/guard.middleware.js";

const userRouter = Router();

// @POST /api/user/signup
userRouter.post("/signup", createUser);

// @POST /api/user/login
userRouter.post("/login", login);

// @POST /api/user/send-mail
userRouter.post("/send-mail", sendEmail);

// @POST /api/user/forgot-password
userRouter.post("/forgot-password", forgotPassword);


//@Get /api/user/session
userRouter.get(
  "/session",
  AdminUserGuard,
  (req, res) => {
    return res.json(
      req.user
        
    );
  }
);

// @POST /api/user/verify-token
userRouter.post("/verify-token", verifyTokenGuard, verifyToken);

// @PUT /api/user/change-password
userRouter.put("/change-password", verifyTokenGuard, changePassword);


 



export default userRouter;