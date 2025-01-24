import express from "express";

import {
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getPost,
  getUserPosts,
  postSold,
} from "../controllers/post.controller";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);

postRouter.get("/:id", getPost);

postRouter.get("/user", getUserPosts);

postRouter.post("/", createPost);

postRouter.patch("/:id/sold", postSold);

postRouter.patch("/:id", editPost);

postRouter.delete("/:id", deletePost);

export { postRouter };
