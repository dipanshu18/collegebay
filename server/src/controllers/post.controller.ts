import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

import { type Request, Response } from "express";
import { CreatePostSchema } from "../types/post";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { client } from "../utils/s3";

const postModel = new PrismaClient().post;

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await postModel.findMany({
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

    const post = await postModel.findUnique({ where: { id } });

    if (!post) {
      return res.status(404).json({ msg: "No post found" });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function getUserPosts(req: Request, res: Response) {
  try {
    const { id: userId, email } = req.body.user;

    const posts = await postModel.findMany({
      where: { userId, user: { email } },
    });

    if (posts.length < 1) {
      return res.status(404).json({ msg: "No post found" });
    }

    return res.status(200).json({ posts });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const { id: userId, email } = req.body.user;

    const files = req.files as { buffer: Buffer }[];

    const result = CreatePostSchema.safeParse({
      ...req.body,
      images: files.map((image) => image.buffer),
    });

    if (!result.success) {
      // Extract error messages from Zod's error object
      const errors = result.error.format();

      // Prepare a structured error message object
      const errorMessages: Record<string, string> = {};

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

    const { images, title, description, price } = result.data;

    let keys: string[] = [];
    const uploadPromises = images.map(async (image) => {
      const key = `post/${email}/${crypto.randomUUID()}.jpg`;
      keys.push(key);
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
        ContentType: "image/jpeg",
      });

      const url = await getSignedUrl(client, command);

      // Upload image to the signed URL
      await fetch(url, {
        method: "PUT",
        body: image.buffer,
        headers: {
          "Content-Type": "image/jpeg",
        },
      });
    });

    // Wait for all image uploads to complete
    await Promise.all(uploadPromises);

    const newPost = await postModel.create({
      data: {
        title,
        description,
        images: keys,
        price,
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
    const { id: userId, email } = req.body.user;
    const { id: postId } = req.params;

    const postExists = await postModel.findUnique({
      where: {
        id: postId,
        userId,
        user: { email },
      },
    });

    if (!postExists)
      return res.status(404).json({ msg: "Post does not exists" });

    const postSold = await postModel.update({
      where: {
        id: postId,
        userId,
        user: { email },
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

export async function editPost(req: Request, res: Response) {}

export async function deletePost(req: Request, res: Response) {
  try {
    const { id: userId } = req.body.user;
    const { id: postId } = req.params;

    const postExists = await postModel.findUnique({
      where: {
        id: postId,
        userId,
      },
    });

    if (!postExists) {
      return res.status(404).json({ msg: "Post not found" });
    }

    const deletePromises = postExists.images.map(async (image) => {
      const key = image;
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET!,
        Key: key,
      });

      const url = await getSignedUrl(client, command);

      // Upload image to the signed URL
      await fetch(url, {
        method: "DELETE",
      });
    });

    // Wait for all image uploads to complete
    await Promise.all(deletePromises);

    await postModel.delete({ where: { id: postId, userId } });

    return res.status(200).json({ msg: "Post deleted" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
