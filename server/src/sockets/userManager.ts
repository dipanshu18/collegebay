import "dotenv/config";
const REDIS_URL = process.env.REDIS_URL as string;

import Redis from "ioredis";
import type { WebSocket } from "ws";
import { db } from "../utils/db";

const redisClient = new Redis(REDIS_URL);
const redisPub = redisClient.duplicate();
const redisSub = redisClient.duplicate();

interface Message {
  type: string;
  chatId: string;
  receiverId: string;
  userId: string;
  text: string;
}

const localOnlineUsers: { [userId: string]: WebSocket } = {};

redisSub.subscribe("chat-messages");

redisSub.on("message", (channel, message) => {
  if (channel === "chat-messages") {
    const parsedMessage = JSON.parse(message);
    const rSocket = localOnlineUsers[parsedMessage.receiverId];

    rSocket.send(
      JSON.stringify({
        event: "new_message",
        newMessage: parsedMessage.newMessage,
      })
    );
  }
});

export class UserManager {
  constructor(userId: string, socket: WebSocket) {
    localOnlineUsers[userId] = socket;
    redisClient.sadd("online-users", userId);

    socket.on("close", async () => {
      delete localOnlineUsers[userId];
      await redisClient.srem("online-users", userId);
    });
  }

  async removeUser(userId: string) {
    delete localOnlineUsers[userId];
    await redisClient.srem("online-users", userId);
  }

  async isUserOnline(userId: string) {
    const result = (await redisClient.sismember("online-users", userId)) === 1;
    return result;
  }

  async sendMessage(message: Message) {
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
          },
        },
      },
    });

    if (localOnlineUsers[message.userId]) {
      localOnlineUsers[message.userId].send(
        JSON.stringify({ event: "new_message", newMessage })
      );
    }

    const isReceiverOnline = await this.isUserOnline(message.receiverId);
    if (isReceiverOnline) {
      redisPub.publish(
        "chat-messages",
        JSON.stringify({
          receiverId: message.receiverId,
          userId: message.userId,
          newMessage,
        })
      );
    }
  }
}
