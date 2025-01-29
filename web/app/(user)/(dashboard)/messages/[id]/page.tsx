import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MessageInput } from "@/components/message-input";
import { ChatMessages } from "@/components/chat-messages";
import { getChat } from "@/actions/chat";
import type { IChat, IMessage } from "@/actions/types";
import { cookies } from "next/headers";
import { unsealCookie } from "@/utils/unseal";

export default async function MessageBox({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const response = await getChat(params.id);
  let chat: IChat | undefined = undefined;

  const sealed_uid = cookies().get("uid")?.value;
  const userId = (await unsealCookie(sealed_uid as string)) as string;

  if (response?.error) {
    return console.log(response.error);
  }

  if (response?.success) {
    chat = response.success;
  }

  return (
    <div className="flex flex-1 flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 bg-gray-100 border-y border-gray-100 p-3">
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
      <ChatMessages messages={chat?.messages as IMessage[]} userId={userId} />

      {/* Input Bar */}
      <MessageInput />
    </div>
  );
}
