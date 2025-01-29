import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const db = new PrismaClient();

export async function createMessage(req: Request, res: Response) {
  try {
    const { id } = req.user as { id: string };
    const { chatId } = req.params as { chatId: string };
    const { type, text, url } = req.body;

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const chatExists = await db.chat.findFirst({ where: { id: chatId } });

    if (!chatExists) {
      return res.status(404).json({ msg: "Chat does not found" });
    }

    await db.message.create({
      data: {
        chatId: chatExists.id,
        senderId: user.id,
        type: "TEXT",
        text,
      },
    });

    return res.status(201).json({ msg: "Message created" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}

export async function deleteMessage(req: Request, res: Response) {
  try {
    const { id } = req.user as { id: string };
    const { chatId, id: messageId } = req.params as {
      chatId: string;
      id: string;
    };

    const user = await db.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const chatExists = await db.chat.findFirst({ where: { id: chatId } });

    if (!chatExists) {
      return res.status(404).json({ msg: "Chat does not found" });
    }

    await db.message.delete({
      where: {
        id: messageId,
      },
    });

    return res.status(200).json({ msg: "Message deleted" });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ msg: "Something went wrong" });
  }
}
