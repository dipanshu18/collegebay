"use client";

import { useEffect, useState } from "react";

import type { IChat, IMessage } from "@/actions/types";
import { ChatMessages } from "./chat-messages";
import { MessageInput } from "./message-input";

interface IMessageBoxProps {
  chat: IChat;
  userId: string;
}

export function MessageBox({ chat, userId }: IMessageBoxProps) {
  const [messages, setMessages] = useState<IMessage[]>(chat.messages);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:7777");

    setSocket(ws);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.event === "new_message") {
        setMessages((prev) => [...prev, data.newMessage]);
      }
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <>
      {/* Chat Messages */}
      <div className="flex-1 max-h-[60dvh] lg:max-h-full overflow-y-auto p-2 border-r border-gray-100 scrollbar-thin">
        <ChatMessages messages={messages} userId={userId} />
      </div>

      {/* Input Bar */}
      <MessageInput
        chatId={chat.id}
        socket={socket as WebSocket}
        receiverId={
          chat.participants.filter((user) => user.id !== userId)[0].id
        }
      />
    </>
  );
}
