import dotenv from "dotenv";
dotenv.config();
const REDIS_URL = process.env.REDIS_URL;

import Redis from "ioredis";
import type { WebSocket } from "ws";
import { db } from "../utils/db";

const client = new Redis({});

const onlineUsers: { [userId: string]: WebSocket } = {};

export class UserManager {
  constructor(userId: string, socket: WebSocket) {
    onlineUsers[userId] = socket;
    client.sadd("online_users", userId);
  }

  async removeUser(userId: string) {
    delete onlineUsers[userId];
    await client.srem("online_users", userId);
  }

  async isUserOnline(userId: string) {
    console.log(userId);
    return client.sismember("online_users", userId);
  }

  async sendMessage(
    receiverId: string,
    userId: string,
    message: { type: string; chatId: string; userId: string; text: string }
  ) {
    const newMessage = await db.message.create({
      data: {
        type: "TEXT",
        chatId: message.chatId,
        senderId: message.userId,
        text: message.text,
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
            college: true,
          },
        },
      },
    });

    const rsocket = onlineUsers[receiverId];
    const usocket = onlineUsers[userId];

    if (rsocket) {
      rsocket.send(JSON.stringify({ event: "new_message", newMessage }));
    }

    if (usocket) {
      usocket.send(JSON.stringify({ event: "new_message", newMessage }));
    }
  }
}
