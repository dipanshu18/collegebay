import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET as string;
const SEAL_PASSWORD = process.env.SEAL_PASSWORD as string;

import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sealData } from "iron-session";

import { Login, Signup } from "../types/auth";
import { db } from "../utils/db";

export async function signup(req: Request, res: Response) {
  const result = Signup.safeParse(req.body);

  if (!result.success) {
    // Extract error messages from Zod's error object
    const errors = result.error.format();

    // Prepare a structured error message object
    const errorMessages: Record<string, string> = {};

    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.entries(errors).forEach(([field, error]) => {
      if (field !== "_errors") {
        // Exclude the '_errors' field
        if (Array.isArray(error)) {
          // If error is a string array, join the messages
          errorMessages[field] = error.join(", ");
        } else if (error && "_errors" in error) {
          // If error is an object with _errors key, join those messages
          errorMessages[field] = error._errors.join(", ");
        }
      }
    });

    return res.status(400).json({
      msg: errorMessages, // Sending a structured object without the '_errors' key
    });
  }

  const { email, name, password, college, phoneNo, image } = result.data;

  try {
    const userExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ msg: "Account already exists. Please login!" });
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        name,
        password: hashPass,
        college,
        phoneNo,
        image,
      },
    });

    if (newUser) {
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        SECRET
      );
      res.cookie("session", token);
      const result = await sealData(newUser.id, { password: SEAL_PASSWORD });
      res.cookie("uid", result);
      return res
        .status(201)
        .json({ msg: "Account created!", userId: newUser.id });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong!" });
  }
}

export async function login(req: Request, res: Response) {
  const result = Login.safeParse(req.body);

  if (!result.success) {
    // Extract error messages from Zod's error object
    const errors = result.error.format();

    // Prepare a structured error message object
    const errorMessages: Record<string, string> = {};

    // biome-ignore lint/complexity/noForEach: <explanation>
    Object.entries(errors).forEach(([field, error]) => {
      if (field !== "_errors") {
        // Exclude the '_errors' field
        if (Array.isArray(error)) {
          // If error is a string array, join the messages
          errorMessages[field] = error.join(", ");
        } else if (error && "_errors" in error) {
          // If error is an object with _errors key, join those messages
          errorMessages[field] = error._errors.join(", ");
        }
      }
    });

    return res.status(400).json({
      msg: errorMessages, // Sending a structured object without the '_errors' key
    });
  }

  const { email, password } = result.data;

  try {
    const userExists = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExists) {
      return res.status(400).json({ msg: "Please create an account!" });
    }

    const validPass = await bcrypt.compare(password, userExists.password);

    if (!validPass) {
      return res.status(400).json({ msg: "Incorrect credentials!" });
    }

    const token = jwt.sign(
      { id: userExists.id, role: userExists.role },
      SECRET
    );

    const result = await sealData(userExists.id, { password: SEAL_PASSWORD });
    res.cookie("session", token);
    res.cookie("uid", result);
    return res.status(200).json({ msg: "Credentials verified!" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong!" });
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("session");
  return res.status(200).json({ msg: "Logging out!" });
}
