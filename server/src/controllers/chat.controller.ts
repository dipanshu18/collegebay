import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const db = new PrismaClient();

export async function getAllChats(req: Request, res: Response) {
  try {
    const { id } = req.user as { id: string };

    const user = await db.user.findFirst({ where: { id } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const chats = await db.chat.findMany({
      where: {
        participants: {
          some: {
            id,
          },
        },
      },
      include: {
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                image: true,
                name: true,
                college: true,
              },
            },
          },
        },
        participants: {
          select: {
            id: true,
            name: true,
            image: true,
            college: true,
          },
        },
      },
    });

    if (chats.length === 0) {
      return res.status(404).json({ msg: "No chat found" });
    }

    return res.status(200).json({ chats });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function getChat(req: Request, res: Response) {
  try {
    const { id } = req.user as { id: string };
    const { id: chatId } = req.params;

    const user = await db.user.findFirst({ where: { id } });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const chat = await db.chat.findFirst({
      where: {
        id: chatId,
      },
      include: {
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                image: true,
                name: true,
                college: true,
              },
            },
          },
        },
        participants: {
          select: {
            id: true,
            image: true,
            name: true,
            college: true,
          },
        },
      },
    });

    if (!chat) {
      return res.status(404).json({ msg: "Chat not found" });
    }

    return res.status(200).json({ chat });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function startChat(req: Request, res: Response) {
  try {
    const { id } = req.user as { id: string };
    const { withUserId } = req.body as { withUserId: string };

    if (id !== withUserId) {
      return res.status(400).json({ msg: "You cannot chat with yourself" });
    }

    const userExists = await db.user.findFirst({ where: { id } });
    const withUserExists = await db.user.findFirst({
      where: { id: withUserId },
    });
    if (!userExists || !withUserExists) {
      return res.status(404).json({ msg: "One or both users not found" });
    }

    const chatExists = await db.chat.findFirst({
      where: {
        participants: {
          some: {
            id: id,
          },
        },
        AND: {
          participants: {
            some: {
              id: withUserId,
            },
          },
        },
      },
    });

    if (!chatExists) {
      const startChat = await db.chat.create({
        data: {
          participants: {
            connect: [
              {
                id,
              },
              {
                id: withUserId,
              },
            ],
          },
        },
      });

      return res
        .status(201)
        .json({ msg: "Initiated chat", chatId: startChat.id });
    }

    return res.status(400).json({ msg: "Chat already exists" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
