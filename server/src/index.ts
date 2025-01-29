import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "colors";

import { authMiddleware } from "./middlewares/auth.middleware";

import { adminRouter } from "./routers/admin.router";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import { postRouter } from "./routers/post.router";
import { requestRouter } from "./routers/request.router";
import { messageRouter } from "./routers/message.router";
import { chatRouter } from "./routers/chat.router";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(colors.bgGreen("LOG:"), req.method, req.path);
  next();
});

app.get("/", (req: Request, res: Response) => {
  return res.json({ status: "working..." });
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", authMiddleware, userRouter);
app.use("/api/v1/requests", authMiddleware, requestRouter);
app.use("/api/v1/posts", authMiddleware, postRouter);
app.use("/api/v1/chats", authMiddleware, chatRouter);
app.use("/api/v1/messages", authMiddleware, messageRouter);
