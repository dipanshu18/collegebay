import express from "express";
import {
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.controller";
import multer from "multer";

const upload = multer();
const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.put("/", upload.single("image"), updateUser);
userRouter.delete("/", deleteUser);

export { userRouter };
