import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "colors";

import { authRouter } from "./routers/auth.router";
import { authMiddleware } from "./middlewares/auth.middleware";
import { userRouter } from "./routers/user.router";
import { requestRouter } from "./routers/request.router";
import { postRouter } from "./routers/post.router";
import { adminRouter } from "./routers/admin.router";
import { adminMiddleware } from "./middlewares/admin.middleware";

export const app = express();

app.use(express.urlencoded({ extended: true }));
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
app.use("/api/v1/admin", adminMiddleware, adminRouter);
app.use("/api/v1/user", authMiddleware, userRouter);
app.use("/api/v1/requests", authMiddleware, requestRouter);
app.use("/api/v1/posts", authMiddleware, postRouter);
