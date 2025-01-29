import { type Prisma, PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

import type { Request, Response } from "express";
import { CreatePostSchema, UpdatePostSchema } from "../types/post";
import type { z } from "zod";

const db = new PrismaClient();

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await db.post.findMany({
      where: {
        isApproved: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (posts.length < 1) {
      return res.status(404).json({ msg: "No posts found" });
    }

    return res.status(200).json({ posts });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function getPost(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const post = await db.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            college: true,
            email: true,
            image: true,
            name: true,
            phoneNo: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ msg: "No post found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function getFilteredPosts(req: Request, res: Response) {
  try {
    const q = req.query.q as string;
    const category = req.query.category as
      | "ALL"
      | "EQUIPMENT"
      | "NOTES"
      | "ELECTRONICS"
      | "FURNITURE"
      | "BOOKS";

    const queryConditions: Prisma.PostWhereInput = {
      isApproved: true,
    };
    if (q) {
      queryConditions.title = { contains: q, mode: "insensitive" };
    }

    if (category && category !== "ALL") {
      queryConditions.category = { equals: category };
    }

    const posts = await db.post.findMany({
      where: queryConditions,
    });

    if (posts.length === 0) {
      return res.status(404).json({
        msg: "No posts found with the provided filters",
      });
    }

    return res.status(200).json({ posts });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const { id: userId } = req.user as { id: string };

    const result = CreatePostSchema.safeParse(req.body);

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

    const { images, title, description, price, category } = result.data;

    const newPost = await db.post.create({
      data: {
        title,
        description,
        images,
        price,
        category,
        userId,
      },
    });

    if (newPost) {
      return res.status(201).json({ msg: "Post created" });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function postSold(req: Request, res: Response) {
  try {
    const { id: userId } = req.user as { id: string };
    const { id: postId } = req.params;

    const postExists = await db.post.findUnique({
      where: {
        id: postId,
        userId,
      },
    });

    if (!postExists)
      return res.status(404).json({ msg: "Post does not exists" });

    const postSold = await db.post.update({
      where: {
        id: postId,
        userId,
      },
      data: {
        isAvailable: false,
      },
    });

    if (postSold) {
      return res.status(200).json({ msg: "Updated post status" });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function editPost(req: Request, res: Response) {
  try {
    const { id } = req.user as { id: string };
    const { id: postId } = req.params;

    if (!id) {
      return res.status(404).json({ msg: "User not found" });
    }

    const post = await db.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const result = UpdatePostSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({ msg: "Invalid inputs" });
    }

    const dataUpdates = result.data;

    if (!dataUpdates) {
      return res.status(400).json({ msg: "Nothing to update" });
    }

    const updatedData: z.infer<typeof UpdatePostSchema> = {
      title: dataUpdates.title ?? post.title,
      images: dataUpdates.images ?? post.images,
      category: dataUpdates.category ?? post.category,
      price: dataUpdates.price ?? post.price,
      description: dataUpdates.description ?? post.description,
    };

    const updatedPost = await db.post.update({
      where: { id: postId },
      data: {
        ...updatedData,
      },
    });

    console.log(updatedData);

    if (updatedPost) {
      return res.status(200).json({ msg: "Post updated" });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    const { id: userId } = req.user as { id: string };
    const { id: postId } = req.params;

    const postExists = await db.post.findUnique({
      where: {
        id: postId,
        userId,
      },
    });

    if (!postExists) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // TODO: delete from cloudinary

    await db.post.delete({ where: { id: postId, userId } });

    return res.status(200).json({ msg: "Post deleted" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
