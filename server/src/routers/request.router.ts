import express from "express";
import multer from "multer";

import {
  createRequest,
  deleteRequest,
  getAllRequests,
  getUserRequests,
  upVoteRequest,
} from "../controllers/request.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const requestRouter = express.Router();

const upload = multer();
requestRouter.get("/", getAllRequests);

requestRouter.get("/user", getUserRequests);

requestRouter.post(
  "/create",
  upload.single("image"),
  authMiddleware,
  createRequest
);

requestRouter.post("/upvote/:id", upVoteRequest);

requestRouter.delete("/:id", deleteRequest);

export { requestRouter };
