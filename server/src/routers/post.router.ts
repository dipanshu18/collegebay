import express from "express";

import {
  createFeedbackForPost,
  createPost,
  deletePost,
  editPost,
  getAllPosts,
  getFilteredPosts,
  getPost,
  postSold,
} from "../controllers/post.controller";

const postRouter = express.Router();

postRouter.get("/", getAllPosts);

postRouter.get("/filters", getFilteredPosts);

postRouter.get("/:id", getPost);

postRouter.post("/", createPost);

postRouter.post("/feedback/:id", createFeedbackForPost);

postRouter.patch("/:id/sold", postSold);

postRouter.patch("/:id", editPost);

postRouter.delete("/:id", deletePost);

export { postRouter };
