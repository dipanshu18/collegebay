import express from "express";

import {
  createRequest,
  deleteRequest,
  getAllRequests,
  getUserRequests,
  upVoteRequest,
} from "../controllers/request.controller";

const requestRouter = express.Router();

requestRouter.get("/", getAllRequests);

requestRouter.get("/user", getUserRequests);

requestRouter.post("/create", createRequest);

requestRouter.post("/upvote/:id", upVoteRequest);

requestRouter.delete("/:id", deleteRequest);

export { requestRouter };
