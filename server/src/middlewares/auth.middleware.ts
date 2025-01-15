import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET as string;

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies["session"];
  if (!token) {
    return res.status(401).json({ msg: "Unauthorized!" });
  }

  const decoded = jwt.verify(token, SECRET) as JwtPayload;

  if (!decoded) {
    return res.status(401).json({ msg: "Invalid token!" });
  }

  req.body.user = decoded;
  console.log(req.body);

  next();
}
