import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getUser);

userRouter.patch("/", updateUser);

userRouter.delete("/", deleteUser);

export { userRouter };
