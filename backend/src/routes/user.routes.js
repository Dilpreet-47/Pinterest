import express from "express";
import { Router } from "express";
import { registerUser, loginUser, LogoutUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", authMiddleware, LogoutUser);

export default userRouter;