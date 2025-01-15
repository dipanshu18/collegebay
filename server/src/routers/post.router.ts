import express from "express";
import multer from "multer";

import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPost,
  getUserPosts,
  postSold,
} from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const postRouter = express.Router();

const uploads = multer();
postRouter.get("/", getAllPosts);

postRouter.get("/user", getUserPosts);

postRouter.post("/", uploads.array("images"), authMiddleware, createPost);

postRouter.get("/:id", getPost);

postRouter.put("/:id/sold", authMiddleware, postSold);

postRouter.put("/:id", uploads.array("images"), authMiddleware, editPost);

postRouter.delete("/:id", deletePost);

export { postRouter };
