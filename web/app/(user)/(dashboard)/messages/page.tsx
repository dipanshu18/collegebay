"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function MessagesPage() {
  const [chat, selectChat] = useState();

  return (
    <div className="lg:h-dvh flex flex-col mb-20 lg:mb-0">
      <div className="pl-5">
        <h1 className="text-xl py-5 font-bold text-primary">
          Your messages with the sellers
        </h1>
      </div>

      <div className="flex-1 w-full flex overflow-hidden">
        {/* Sidebar */}
        <div className="flex-1 lg:border-r border-gray-100 border-t w-full overflow-y-auto scrollbar-thin">
          {Array(7)
            .fill("")
            .map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Link key={idx} href={`/messages/${idx + 1}`} className="block">
                <div className="flex items-center gap-3 border-b border-gray-100 p-5 hover:bg-gray-100">
                  <Image
                    src={"/logo.svg"}
                    alt="user profile pic"
                    width={100}
                    height={100}
                    quality={100}
                    className="w-10 h-10 object-cover rounded-full border border-black"
                  />
                  <div>
                    <h1 className="text-secondary">Seller Full Name</h1>
                    <p className="text-sm text-primary">
                      Last message: Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit.
                    </p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
