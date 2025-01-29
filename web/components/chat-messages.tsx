"use client";

import Image from "next/image";

import type { IMessage } from "@/actions/types";

export function ChatMessages({
  messages,
  userId,
}: {
  messages: IMessage[];
  userId: string;
}) {
  return (
    <div className="flex-1 max-h-[62dvh] lg:max-h-full overflow-y-auto p-2 scrollbar-thin">
      <div className="grid grid-cols-1 gap-3">
        {messages && messages.length > 0 ? (
          messages.map((_, idx) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={idx}
              className={`flex ${
                idx % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`${
                  idx % 2 === 0
                    ? "bg-gray-100 text-secondary"
                    : "bg-primary text-white"
                } max-w-sm p-3 rounded-lg shadow-md`}
              >
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Laboriosam, harum.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Image
                    src={"/logo.svg"}
                    alt="user profile pic"
                    width={100}
                    height={100}
                    quality={100}
                    className="w-6 h-6 rounded-full"
                  />
                  <h1
                    className={`font-bold ${
                      idx % 2 === 0 ? "text-primary" : "text-white"
                    }`}
                  >
                    {idx % 2 === 0 ? "Other User" : "You"}
                  </h1>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>Start the conversation by sending {"Hi"}</h1>
        )}
      </div>
    </div>
  );
}
