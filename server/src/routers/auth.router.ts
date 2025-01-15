import express from "express";
import multer from "multer";

import { login, logout, signup } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const upload = multer();
const authRouter = express.Router();

authRouter.post("/signup", upload.single("image"), signup);

authRouter.post("/login", login);

authRouter.post("/logout", authMiddleware, logout);

export { authRouter };
