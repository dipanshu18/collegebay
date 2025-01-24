import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { UserRequestSchema } from "../types/request";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { client } from "../utils/s3";

const requestModel = new PrismaClient().request;
const upVoteModel = new PrismaClient().upVote;

export async function getAllRequests(req: Request, res: Response) {
  try {
    const requests = await requestModel.findMany({
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
    const { id: userId } = req.user!;
    const requests = await requestModel.findMany({
      where: {
        userId,
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
    const { id } = req.user!;
    const result = UserRequestSchema.safeParse(req.body);

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

    const { image, title, description } = result.data;

    // const key = `request/${email}/${crypto.randomUUID()}.jpg`;
    // const command = new PutObjectCommand({
    //   Bucket: process.env.AWS_BUCKET!,
    //   Key: key,
    //   ContentType: "image/jpeg",
    // });
    // const url = await getSignedUrl(client, command);

    // await fetch(url, {
    //   method: "PUT",
    //   body: image,
    //   headers: {
    //     "Content-Type": "image/jpeg",
    //   },
    // });

    const newRequest = await requestModel.create({
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
    const { id: userId } = req.user!;
    const { id: requestId } = req.params;

    const requestExists = await requestModel.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!requestExists) {
      return res.status(404).json({ msg: "Request doesn't exists" });
    }

    const alreadyUpVoted = await upVoteModel.findUnique({
      where: {
        requestId_userId: {
          requestId,
          userId,
        },
      },
    });

    if (!alreadyUpVoted) {
      await upVoteModel.create({ data: { requestId, userId } });
      return res.status(200).json();
    } else {
      await upVoteModel.delete({
        where: {
          requestId_userId: {
            requestId,
            userId,
          },
        },
      });
      return res.status(200).json();
    }
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function deleteRequest(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const requestExists = await requestModel.findUnique({ where: { id } });

    if (!requestExists) {
      return res.status(404).json({ msg: "Request doesn't exists" });
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET!,
      Key: requestExists.image,
    });
    const url = await getSignedUrl(client, command);

    await fetch(url, { method: "DELETE" });

    await requestModel.delete({ where: { id } });

    return res.status(200).json({ msg: "Request deleted" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
