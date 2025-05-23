import dotenv from "dotenv";
dotenv.config();

import type { Request, Response } from "express";
import type { z } from "zod";
import bcrypt from "bcrypt";

import { UpdateUserSchema } from "../types/user";
import { db } from "../utils/db";

export async function getUser(req: Request, res: Response) {
  try {
    const { id } = req.user as { id: string };

    if (!id) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = await db.user.findUnique({
      where: { id },
      select: {
        id: true,
        image: true,
        email: true,
        name: true,
        posts: true,
        purchasedItems: {
          include: {
            feeback: true,
          },
        },
        phoneNo: true,
        college: true,
        requests: {
          include: {
            _count: {
              select: {
                upVotes: true,
              },
            },
            user: {
              select: {
                id: true,
                image: true,
                email: true,
                phoneNo: true,
                college: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json({ user });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function getUserNotifications(req: Request, res: Response) {
  try {
    const { id } = req.user as { id: string };

    if (!id) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = await db.user.findUnique({
      where: { id },
    });

    const notifications = await db.notification.findMany({
      where: {
        targetId: user?.id,
        read: false,
      },
      include: {
        action: {
          select: {
            id: true,
            image: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({ notifications });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function markAsRead(req: Request, res: Response) {
  try {
    const id = req.params.id;

    await db.notification.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    });

    res.status(200).json({ msg: "Notification marked as read" });
    return;
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.user as { id: string };

    if (!id) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const result = UpdateUserSchema.safeParse(req.body);

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

    // const key = user.image;
    // if (dataUpdates.image) {
    //   const command = new PutObjectCommand({
    //     Bucket: process.env.AWS_BUCKET!,
    //     Key: key,
    //     ContentType: "image/jpeg",
    //   });

    //   const url = await getSignedUrl(client, command);

    //   await fetch(url, {
    //     method: "PUT",
    //     body: dataUpdates.image,
    //     headers: { "Content-Type": "image/jpeg" },
    //   });
    // }

    const updatedData: z.infer<typeof UpdateUserSchema> = {
      name: dataUpdates.name ?? user.name,
      image: dataUpdates.image ?? user.image,
      password: dataUpdates.password ? newHash : user.password,
      phoneNo: dataUpdates.phoneNo ?? user.phoneNo,
    };

    const updatedUser = await db.user.update({
      where: { id },
      data: {
        image: updatedData.image,
        name: updatedData.name,
        password: updatedData.password,
        phoneNo: updatedData.phoneNo,
      },
    });

    console.log(updatedData);

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
    const { id } = req.user as { id: string };

    if (!id) {
      return res.status(404).json({ msg: "User not found" });
    }

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const posts = await db.post.findMany({ where: { sellerId: id } });

    if (posts.length > 0) {
      return res.status(400).json({ msg: "Delete all your listings first" });
    }

    const requests = await db.request.findMany({ where: { userId: id } });

    if (requests.length > 0) {
      return res.status(400).json({ msg: "Delete all your requests first" });
    }

    // const command = new DeleteObjectCommand({
    //   Bucket: process.env.AWS_BUCKET!,
    //   Key: user.image,
    // });
    // const url = await getSignedUrl(client, command);

    // await fetch(url, { method: "DELETE" });

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
