import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

import colors from "colors";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export async function init() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      origin: ["http://localhost:5173"],
      allowedHeaders: ["*"],
      credentials: true,
    })
  );

  app.use((req) => {
    console.log(colors.bgGreen("LOG:"), req.method, req.path);
  });

  app.listen(PORT, () => {
    console.log(colors.bold.cyan(`Server started on port: ${PORT}`));
  });
}
