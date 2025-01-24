"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Messages() {
  const [chat, setChat] = useState(null);

  return (
    <div className="h-full lg:h-[94dvh] flex flex-col">
      <div className="mb-2 p-2">
        <h1 className="text-xl font-bold">Your messages with the sellers</h1>
      </div>

      <div className="flex-1 w-full flex overflow-hidden">
        {/* Sidebar */}
        <div className="flex-1 border-r border-t lg:max-w-2xl overflow-y-auto scrollbar-thin">
          {Array(7)
            .fill("")
            .map((_, idx) => (
              <div
                /* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */
                key={idx}
                className="flex items-center gap-3 border-b p-2 hover:bg-neutral-100"
              >
                <Image
                  src={"/logo.svg"}
                  alt="user profile pic"
                  width={100}
                  height={100}
                  quality={100}
                  className="w-10 h-10 object-cover rounded-full border border-black"
                />
                <div>
                  <h1>Seller Full Name</h1>
                  <p className="text-sm text-gray-600">
                    last message: Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Maiores, dolorem!
                  </p>
                </div>
              </div>
            ))}
        </div>

        {/* Main Chat Area */}
        {chat ? (
          <div className="hidden lg:flex flex-1 flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-2 border-y p-2.5">
              <Image
                src={"/logo.svg"}
                alt="user profile pic"
                width={100}
                height={100}
                quality={100}
                className="w-10 h-10 rounded-full border border-black"
              />
              <h1 className="text-xl font-bold">Seller Full Name</h1>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
              <div className="grid grid-cols-1 gap-3">
                {Array(20)
                  .fill("")
                  .map((_, idx) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <div key={idx} className="border min-w-full p-2 rounded">
                      <div className="flex flex-col gap-2">
                        <p>
                          Lorem, ipsum dolor sit amet consectetur adipisicing
                          elit. Laboriosam, harum.
                        </p>
                        <div className="flex items-center gap-2">
                          <Image
                            src={"/logo.svg"}
                            alt="user profile pic"
                            width={100}
                            height={100}
                            quality={100}
                            className="w-6 h-6 rounded-full border border-black"
                          />
                          <h1>name</h1>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="w-full sticky bottom-0 flex gap-2 items-center bg-white p-2 border-t">
              <div className="relative w-full">
                <Textarea placeholder="your message" className="flex-1" />
                <Button className="absolute bottom-0 right-0 m-2">
                  <Send />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden lg:flex flex-col h-full justify-center mx-auto max-w-lg p-5 border-t">
            <h1 className="text-left text-xl font-bold">Select a chat</h1>
            <p className="text-left">
              Choose from your existing messages, or start a new one
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
