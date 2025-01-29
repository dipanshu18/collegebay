import Image from "next/image";
import Link from "next/link";

import { getAllChats } from "@/actions/chat";
import type { IChat } from "@/actions/types";

export default async function MessagesPage() {
  const response = await getAllChats();
  let chats: IChat[] | [] = [];

  if (response?.error) {
    return (
      <>
        <div className="lg:h-dvh flex flex-col mb-20 lg:mb-0 border-r">
          <div className="pl-5">
            <h1 className="text-xl py-5 font-bold text-primary">
              Your messages with the sellers
            </h1>
          </div>
          <div className="pl-5">
            <h1 className="text-xl font-bold">
              You don{`'`}t have any chats with the sellers
            </h1>
          </div>
        </div>
      </>
    );
  }

  if (response?.success) {
    chats = response.success;
    console.log(chats);
  }

  return (
    <div className="lg:h-dvh flex flex-col mb-20 lg:mb-0 border-r">
      <div className="pl-5">
        <h1 className="text-xl py-5 font-bold text-primary">
          Your messages with the sellers
        </h1>
      </div>

      <div className="flex-1 w-full flex overflow-hidden">
        {/* Sidebar */}
        <div className="flex-1 border-t w-full overflow-y-auto scrollbar-thin">
          {chats && chats.length > 0 ? (
            chats.map((item) => (
              <Link
                key={item.id}
                href={`/messages/${item.id}`}
                className="block"
              >
                <div className="flex items-center gap-3 border-b p-5 hover:bg-gray-100">
                  <Image
                    src={item.participants[1].image}
                    alt="user profile pic"
                    width={100}
                    height={100}
                    quality={100}
                    className="w-10 h-10 object-cover rounded-full"
                  />
                  <div>
                    <h1 className="text-secondary">
                      {item.participants[1].name}
                    </h1>
                    <p className="text-sm text-primary">
                      {item.messages && item.messages.length > 0 ? (
                        item.messages[item.messages.length - 1].text
                      ) : (
                        <p>Start conversation by sending the first message</p>
                      )}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div>
              <h1 className="text-xl font-bold">
                You don{`'`}t have any chats with the sellers
              </h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
