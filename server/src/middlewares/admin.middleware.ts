import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET as string;

import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.session;

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized!" });
  }

  const decoded = jwt.verify(token, SECRET) as JwtPayload as {
    id: string;
    role: "ADMIN" | "USER";
  };

  if (!decoded) {
    return res.status(401).json({ msg: "Invalid token!" });
  }

  if (decoded.role !== "ADMIN") {
    return res
      .status(400)
      .json({ msg: "Only admin is allowed to access this page" });
  }

  req.user = decoded;

  next();
}
