"use client";

import Image from "next/image";

import type { IMessage } from "@/actions/types";
import { useEffect, useRef } from "react";

export function ChatMessages({
  messages,
  userId,
}: {
  messages: IMessage[];
  userId: string;
}) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid grid-cols-1 gap-3">
      {messages && messages.length > 0 ? (
        messages.map((item) => (
          <div
            key={item.id}
            className={`flex ${
              item.senderId !== userId ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`${
                item.senderId !== userId
                  ? "bg-gray-100 text-secondary"
                  : "bg-primary text-white"
              } max-w-sm p-3 rounded-lg shadow-md`}
            >
              <p>{item.text}</p>
              <div className="flex items-center gap-2 mt-2">
                <Image
                  src={item.sender.image}
                  alt="user profile pic"
                  width={100}
                  height={100}
                  quality={100}
                  className="w-6 h-6 rounded-full"
                />
                <h1
                  className={`font-bold ${
                    item.senderId !== userId ? "text-primary" : "text-white"
                  }`}
                >
                  {item.sender.name}
                </h1>
              </div>
            </div>
            <div ref={messagesEndRef} />
          </div>
        ))
      ) : (
        <div className="text-center">
          <h1 className="text-lg font-bold">
            Start the conversation by sending {`"`}Hi{`"`}
          </h1>
          <p>Do not pay upfront with any links.</p>
          <p>Always do pay when the product is received.</p>
          <p>
            Reach out us if any seller is trying to pay upfront with proper
            messages screenshot to report them
          </p>
        </div>
      )}
    </div>
  );
}
