import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET as string;

import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies["session"];
  console.log(req.cookies);

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized!" });
  }

  const decoded = jwt.verify(token, SECRET) as JwtPayload;

  if (!decoded) {
    return res.status(401).json({ msg: "Invalid token!" });
  }

  if (decoded.role !== "ADMIN") {
    return res
      .status(400)
      .json({ msg: "Only admin are allowed to access this page" });
  }

  req.body.user = decoded;

  next();
}
