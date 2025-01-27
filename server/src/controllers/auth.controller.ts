import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET as string;

import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Login, Signup } from "../types/auth";
import { PrismaClient } from "@prisma/client";

const userModel = new PrismaClient().user;

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
    const userExists = await userModel.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ msg: "Account already exists. Please login!" });
    }

    // const key = `profile/${email}/${crypto.randomUUID()}.jpg`;
    // const command = new PutObjectCommand({
    //   Bucket: process.env.AWS_BUCKET!,
    //   Key: key,
    //   ContentType: "image/jpeg",
    // });

    // const url = await getSignedUrl(client, command);

    // await fetch(url, {
    //   method: "PUT",
    //   body: image,
    //   headers: { "Content-Type": "image/jpeg" },
    // });

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
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
      return res.status(201).json({ msg: "Account created!" });
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
    const userExists = await userModel.findUnique({
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
      { id: userExists.id, email: userExists.email, role: userExists.role },
      SECRET
    );
    res.cookie("session", token);
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
