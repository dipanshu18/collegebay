import dotenv from "dotenv";
dotenv.config();

import type { Request, Response } from "express";
import { UserRequestSchema } from "../types/request";
import { db } from "../utils/db";

export async function getAllRequests(req: Request, res: Response) {
  try {
    const requests = await db.request.findMany({
      where: {
        isApproved: true,
      },
      orderBy: {
        upVotes: {
          _count: "desc",
        },
      },
      include: {
        _count: {
          select: {
            upVotes: true,
          },
        },
        user: {
          select: {
            college: true,
            email: true,
            image: true,
            name: true,
            phoneNo: true,
          },
        },
      },
    });

    if (requests.length < 1) {
      return res.status(404).json({ msg: "No requests found" });
    }

    return res.status(200).json({ requests });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function getUserRequests(req: Request, res: Response) {
  try {
    const { id: userId } = req.user as { id: string };
    const requests = await db.request.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (requests.length < 1) {
      return res.status(404).json({ msg: "No requests found" });
    }

    return res.status(200).json({ requests });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function createRequest(req: Request, res: Response) {
  try {
    const { id } = req.user as { id: string };
    const result = UserRequestSchema.safeParse(req.body);

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

    const { image, title, description } = result.data;

    const newRequest = await db.request.create({
      data: {
        title,
        description,
        image,
        userId: id,
      },
    });

    if (newRequest) {
      return res.status(201).json({ msg: "Request created" });
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function upVoteRequest(req: Request, res: Response) {
  try {
    const { id: userId } = req.user as { id: string };
    const { id: requestId } = req.params;

    const requestExists = await db.request.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!requestExists) {
      return res.status(404).json({ msg: "Request doesn't exists" });
    }

    const alreadyUpVoted = await db.upVote.findUnique({
      where: {
        requestId_userId: {
          requestId,
          userId,
        },
      },
    });

    if (!alreadyUpVoted) {
      await db.upVote.create({ data: { requestId, userId } });
      return res.status(200).json();
    }

    await db.upVote.delete({
      where: {
        requestId_userId: {
          requestId,
          userId,
        },
      },
    });
    return res.status(200).json();
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function deleteRequest(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const requestExists = await db.request.findUnique({ where: { id } });

    if (!requestExists) {
      return res.status(404).json({ msg: "Request doesn't exists" });
    }

    await db.request.delete({ where: { id } });

    return res.status(200).json({ msg: "Request deleted" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
