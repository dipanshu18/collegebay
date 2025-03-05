"use client";

import Image from "next/image";

import type { IMessage } from "@/actions/types";
import { useEffect, useRef } from "react";
import { cn } from "./lib/utils";
import { formatDistanceToNow } from "date-fns";

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
            className={`flex gap-1 ${
              item.senderId !== userId
                ? "justify-start"
                : "ml-auto flex-row-reverse"
            }`}
          >
            <Image
              src={item.sender.image}
              alt="user profile pic"
              width={200}
              height={200}
              quality={100}
              className="w-10 h-10 rounded-full"
            />
            <div
              className={`${
                item.senderId !== userId
                  ? "bg-gray-100 text-secondary"
                  : "bg-primary text-white"
              } p-3 rounded-md w-[300px] md:w-[500px] gap-2 flex flex-col`}
            >
              <div
                className={cn(
                  "flex items-center gap-1",
                  item.senderId === userId && "flex-row-reverse ml-auto"
                )}
              >
                <h1
                  className={`font-bold text-sm ${
                    item.senderId !== userId ? "text-primary" : "text-white"
                  }`}
                >
                  {item.senderId === userId ? "You" : item.sender.name}
                </h1>
              </div>
              <p className={cn(item.senderId === userId && "text-right")}>
                {item.text}
              </p>
              <p
                className={cn(
                  "text-xs text-wrap",
                  item.senderId === userId
                    ? "text-white ml-auto"
                    : "text-accent"
                )}
              >
                Created{" "}
                {formatDistanceToNow(new Date(item.createdAt), {
                  addSuffix: true,
                })}
              </p>
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
