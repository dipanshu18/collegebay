"use client";

import { type FormEvent, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import Spinner from "@/components/spinner";
import { toast } from "sonner";

import { sendMessage } from "@/actions/chat";
import { useRouter } from "next/navigation";

export function MessageInput({ chatId }: { chatId: string }) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { pending } = useFormStatus();

  async function handleSendMessage(e: FormEvent) {
    e.preventDefault();

    const response = await sendMessage(chatId, message);

    if (response?.error) {
      return toast.error(response.error);
    }

    if (response?.success) {
      setMessage("");
      return router.refresh();
    }
  }

  return (
    <div className="sticky bottom-0 mb-20 lg:mb-0 px-2 pb-2 border-r border-gray-100 flex gap-2 items-center">
      <div className="w-full relative">
        <form onSubmit={handleSendMessage}>
          <Textarea
            rows={5}
            placeholder="your message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          {pending ? (
            <Button>
              <Spinner />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={pending}
              className="absolute bottom-0 right-0 m-2 bg-primary hover:bg-accent text-white"
            >
              <Send />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
