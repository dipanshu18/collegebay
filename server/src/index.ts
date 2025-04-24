import "dotenv/config";
const PORT = process.env.PORT as string;
const WS_PORT = Number(process.env.WS_PORT as string);

import http from "node:http";
import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import colors from "colors";
import { WebSocketServer } from "ws";

import { authMiddleware } from "./middlewares/auth.middleware";

import { adminRouter } from "./routers/admin.router";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";
import { postRouter } from "./routers/post.router";
import { requestRouter } from "./routers/request.router";
import { chatRouter } from "./routers/chat.router";
import { checkAuth } from "./utils/auth";

import { UserManager } from "./sockets/userManager";

const app = express();
const wss = new WebSocketServer({
  port: WS_PORT,
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:3001"],
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

const server = http.createServer(app);

wss.on("connection", async (socket, request) => {
  const auth = checkAuth(request);
  if (!auth) {
    return request.destroy(new Error("Unauthorized"));
  }

  console.log("Client connected:", auth.id);
  const user = new UserManager(auth.id, socket);

  socket.on("message", async (data) => {
    const decoded = JSON.parse(data.toString());
    const { event, text, receiverId, chatId } = decoded;

    if (event === "new_message") {
      await user.sendMessage({
        receiverId,
        chatId,
        text,
        type: "new_message",
        userId: auth.id,
      });
    }
  });

  socket.on("close", async () => {
    console.log("Client disconnected:", auth.id);
    await user.removeUser(auth.id);
  });
});

server.listen(PORT, () => {
  console.log(colors.cyan(`Server started on port: ${PORT}`));
});
