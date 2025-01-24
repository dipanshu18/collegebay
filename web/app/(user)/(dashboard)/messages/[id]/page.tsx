"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import Image from "next/image";

export default function MessageBox() {
  return (
    <div className="flex flex-1 flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 border-y p-3">
        <Image
          src={"/logo.svg"}
          alt="user profile pic"
          width={100}
          height={100}
          quality={100}
          className="w-10 h-10 rounded-full border border-black"
        />
        <h1>Seller Full Name</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 max-h-[75dvh] overflow-y-auto p-2 scrollbar-thin">
        <div className="grid grid-cols-1 gap-3">
          {Array(20)
            .fill("")
            .map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <div key={idx} className="border min-w-full p-2 rounded">
                <div className="flex flex-col gap-2">
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Laboriosam, harum.
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
  );
}
