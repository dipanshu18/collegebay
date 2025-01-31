import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getChat } from "@/actions/chat";
import type { IChat } from "@/actions/types";
import { cookies } from "next/headers";
import { unsealCookie } from "@/utils/unseal";
import { MessageBox } from "@/components/message-box";

export default async function Chat({
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
    <div className="flex flex-1 flex-col min-h-[91dvh] lg:h-full">
      {/* Header */}
      <div className="flex items-center gap-2 border-y border-r border-gray-100 p-3">
        <div className="">
          <Link
            href={"/messages"}
            className="text-primary hover:bg-secondary hover:text-white transition-all duration-150 w-10 h-10 flex justify-center items-center rounded-full"
          >
            <ArrowLeft size={24} />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={
              chat?.participants.filter((user) => user.id !== userId)[0]
                .image as string
            }
            alt="user profile pic"
            width={100}
            height={100}
            quality={100}
            className="w-10 h-10 rounded-full"
          />
          <h1 className="text-primary font-bold">
            {chat?.participants.filter((user) => user.id !== userId)[0].name}
          </h1>
        </div>
      </div>

      <MessageBox chat={chat as IChat} userId={userId} />
    </div>
  );
}
