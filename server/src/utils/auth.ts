import type internal from "node:http";
import jwt from "jsonwebtoken";

import "dotenv/config";
const SECRET = process.env.SECRET;

export function checkAuth(request: internal.IncomingMessage) {
  let token: string | undefined = undefined;
  const cookies = request.headers.cookie?.split(";")[0];

  if (cookies?.split("=")[0] === "session") {
    token = cookies?.split("=")[1];
  }

  const authHeader = request.headers.authorization?.split(" ")[1];

  if (authHeader) {
    token = authHeader;
  }

  if (!token) {
    return false;
  }

  const decoded = jwt.verify(token, SECRET as string) as {
    id: string;
    role: "USER" | "ADMIN";
  };

  if (!decoded) {
    return false;
  }

  return { ...decoded };
}
