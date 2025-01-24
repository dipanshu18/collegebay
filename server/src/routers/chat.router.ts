import express from "express";

import {
  createChat,
  getUserChat,
  getUserChats,
} from "../controllers/chat.controller";

const chatRouter = express.Router();

chatRouter.get("/", getUserChats);

chatRouter.get("/:id", getUserChat);

chatRouter.post("/", createChat);

export { chatRouter };
