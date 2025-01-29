import express from "express";

import {
  getAllChats,
  getChat,
  startChat,
} from "../controllers/chat.controller";

const chatRouter = express.Router();

chatRouter.get("/", getAllChats);

chatRouter.get("/:id", getChat);

chatRouter.post("/", startChat);

export { chatRouter };
