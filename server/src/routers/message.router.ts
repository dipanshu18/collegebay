import express from "express";

import {
  createMessage,
  deleteMessage,
} from "../controllers/message.controller";

const messageRouter = express.Router();

messageRouter.post("/:chatId", createMessage);

messageRouter.delete("/:chatId/:id", deleteMessage);

export { messageRouter };
