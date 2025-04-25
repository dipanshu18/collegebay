"use client";

import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { postSold } from "@/actions/post";
import type { IChat } from "@/actions/types";
import Image from "next/image";

export function MarkPostSoldForm({
  postId,
  chats,
}: {
  postId: string;
  chats: IChat[];
}) {
  const router = useRouter();
  const { pending } = useFormStatus();

  const [customerId, setCustomerId] = useState("");

  async function handlePostSold(e: FormEvent) {
    e.preventDefault();

    if (customerId.length < 1) {
      return toast.error("Please select a valid user");
    }

    const response = await postSold(postId, customerId);

    if (response?.error) {
      const errorMsg = response.error;
      return toast.error(errorMsg);
    }

    toast.success(response?.success);
    return router.push("/profile");
  }

  return (
    <form onSubmit={handlePostSold} className="space-y-5">
      <Select
        value={customerId}
        onValueChange={(value) => setCustomerId(value)}
        defaultValue=""
      >
        <SelectTrigger className="py-4">
          <SelectValue placeholder="Select user you sold it to" />
        </SelectTrigger>
        <SelectContent>
          {chats.map((chat) => (
            <SelectItem value={chat.participants[0].id} key={chat.id}>
              <div className="flex items-center gap-2">
                <Image
                  src={chat.participants[0].image}
                  width={300}
                  height={300}
                  alt={`${chat.participants[0].name} profile pic`}
                  className="object-cover w-10 h-10 rounded-full"
                />{" "}
                <p>{chat.participants[0].name}</p>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button disabled={pending} className="w-20 flex gap-4" type="submit">
        {pending ? "Submitting..." : "Confirm"}
      </Button>
    </form>
  );
}
