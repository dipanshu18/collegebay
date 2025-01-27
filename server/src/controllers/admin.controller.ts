import dotenv from "dotenv";
dotenv.config();
const SECRET = process.env.SECRET as string;

import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Login } from "../types/auth";

const userModel = new PrismaClient().user;
const postModel = new PrismaClient().post;
const requestModel = new PrismaClient().request;

export async function adminLogin(req: Request, res: Response) {
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
        role: "ADMIN",
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

export async function adminHome(req: Request, res: Response) {
  try {
    const posts = await postModel.findMany({
      where: { isApproved: false },
      orderBy: {
        createdAt: "desc",
      },
    });

    const requests = await requestModel.findMany({
      where: { isApproved: false },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      posts,
      requests,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong!" });
  }
}

export async function requestDetails(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const request = await requestModel.findFirst({
      where: { isApproved: false, id },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      request,
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong!" });
  }
}

export async function approvePost(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await postModel.update({
      where: { id },
      data: {
        adminMessage: "Post verified and approved",
        isApproved: true,
      },
    });

    return res.status(200).json({ msg: "Post approved" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong!" });
  }
}

export async function rejectPost(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    await postModel.update({
      where: { id },
      data: {
        adminMessage: reason,
        isApproved: false,
      },
    });

    return res.status(200).json({ msg: "Post rejected with the reason" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong!" });
  }
}

export async function approveRequest(req: Request, res: Response) {
  try {
    const { id } = req.params;

    await requestModel.update({
      where: { id },
      data: {
        adminMessage: "Request verified and approved",
        isApproved: true,
      },
    });

    return res.status(200).json({ msg: "Request approved" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong!" });
  }
}

export async function rejectRequest(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    await requestModel.update({
      where: { id },
      data: {
        adminMessage: reason,
        isApproved: false,
      },
    });

    return res.status(200).json({ msg: "Request rejected with the reason" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong!" });
  }
}

export async function adminLogout(req: Request, res: Response) {
  res.clearCookie("session");
  return res.status(200).json({ msg: "Logging out!" });
}
