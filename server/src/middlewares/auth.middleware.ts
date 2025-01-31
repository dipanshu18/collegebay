import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET as string;

import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.session || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized!" });
  }

  const decoded = jwt.verify(token, SECRET) as JwtPayload as {
    id: string;
    role: "USER" | "ADMIN";
  };

  if (!decoded) {
    return res.status(401).json({ msg: "Invalid token!" });
  }

  req.user = decoded;

  next();
}
