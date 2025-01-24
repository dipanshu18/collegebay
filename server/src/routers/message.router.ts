import express from "express";

import {
  createMessage,
  deleteMessage,
  getAllChatMessages,
} from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter.get("/:id", getAllChatMessages);

messageRouter.post("/", createMessage);

messageRouter.delete("/:id", deleteMessage);

export { messageRouter };
