import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "colors";

import { authRouter } from "./routers/auth.router";

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
