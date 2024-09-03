import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UpdateUserSchema } from "../types/user";
import { z } from "zod";
import bcrypt from "bcrypt";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { client } from "../utils/s3";

const db = new PrismaClient();

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.body.user;

    if (!id) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = await db.user.findUnique({
      where: { id },
      select: {
        password: false,
        role: false,
        college: true,
        email: true,
        image: true,
        phoneNo: true,
        name: true,
        id: true,
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.body.user;

    if (!id) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const result = UpdateUserSchema.safeParse({ ...req.body, image: req.file });

    if (!result.success) {
      return res.status(400).json({ msg: "Invalid inputs" });
    }

    const dataUpdates = result.data;

    if (!dataUpdates) {
      return res.status(400).json({ msg: "Nothing to update" });
    }

    let newHash = "";
    if (dataUpdates.password) {
      newHash = await bcrypt.hash(dataUpdates.password, 10);
    }

    const key = user.image;
    if (dataUpdates.image) {
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
        ContentType: "image/jpeg",
      });

      const url = await getSignedUrl(client, command);

      await fetch(url, {
        method: "PUT",
        body: dataUpdates.image,
        headers: { "Content-Type": "image/jpeg" },
      });
    }

    const updatedData: z.infer<typeof UpdateUserSchema> = {
      name: dataUpdates.name ? dataUpdates.name : user.name,
      password: dataUpdates.password ? newHash : user.password,
      phoneNo: dataUpdates.phoneNo ? dataUpdates.phoneNo : user.phoneNo,
    };

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        name: updatedData.name,
        password: updatedData.password,
        phoneNo: updatedData.phoneNo,
      },
    });

    if (updatedUser) {
      return res.status(200).json({ msg: "Profile updated" });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.body.user;

    if (!id) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const posts = await db.post.findMany({ where: { userId: id } });

    if (posts.length > 0) {
      return res.status(400).json({ msg: "Delete all your listings first" });
    }

    const requests = await db.request.findMany({ where: { userId: id } });

    if (requests.length > 0) {
      return res.status(400).json({ msg: "Delete all your requests first" });
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: user.image,
    });
    const url = await getSignedUrl(client, command);

    await fetch(url, { method: "DELETE" });

    const deletedUser = await db.user.delete({ where: { id } });

    if (deletedUser) {
      res.clearCookie("session");
      return res.status(200).json({ msg: "Account is deleted" });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
