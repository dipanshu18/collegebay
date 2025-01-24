import type { Request, Response } from "express";

export async function getAllChatMessages(req: Request, res: Response) {
  try {
    const user = req.user;
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function createMessage(req: Request, res: Response) {}

export async function deleteMessage(req: Request, res: Response) {}
