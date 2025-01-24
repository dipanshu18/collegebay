import express from "express";

import { createChat, getUserChats } from "../controllers/chat.controller";

const chatRouter = express.Router();

chatRouter.get("/", getUserChats);

chatRouter.post("/", createChat);

export { chatRouter };
