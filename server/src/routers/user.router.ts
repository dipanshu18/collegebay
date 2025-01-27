import express from "express";
import {
  deleteUser,
  getUser,
  getUserNotifications,
  markAsRead,
  updateUser,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getUser);

userRouter.get("/notifications", getUserNotifications);

userRouter.patch("/notifications/:id", markAsRead);

userRouter.patch("/", updateUser);

userRouter.delete("/", deleteUser);

export { userRouter };
