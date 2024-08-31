import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const userModel = new PrismaClient().user;

export async function getUser(req: Request, res: Response) {
  const { id } = req.body.user;

  const user = await userModel.findUnique({
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
}

export async function updateUser(req: Request, res: Response) {}

export async function deleteUser(req: Request, res: Response) {}
