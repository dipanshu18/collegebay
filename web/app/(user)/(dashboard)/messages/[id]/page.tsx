"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MessageBox() {
  return (
    <div className="flex flex-1 flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 bg-light border-y border-info p-3">
        <div>
          <Link href={"/messages"}>
            <ArrowLeft className="text-primary" />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={"/logo.svg"}
            alt="user profile pic"
            width={100}
            height={100}
            quality={100}
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-primary font-bold">Seller Full Name</h1>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-h-[72dvh] lg:max-h-full overflow-y-auto p-2 scrollbar-thin">
        <div className="grid grid-cols-1 gap-3">
          {Array(20)
            .fill("")
            .map((_, idx) => (
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
                  } max-w-xs p-3 rounded-lg shadow-md`}
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
            ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="w-full mb-20 lg:mb-0 border-t border-info bg-light sticky bottom-0 flex gap-2 items-center p-2">
        <div className="relative w-full">
          <Textarea rows={5} placeholder="your message" className="flex-1" />
          <Button className="absolute bottom-0 right-0 m-2 bg-primary hover:bg-accent text-white">
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}
