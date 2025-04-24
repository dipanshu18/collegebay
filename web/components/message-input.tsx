"use client";

import { type FormEvent, useRef } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";

export function MessageInput({
  chatId,
  receiverId,
  socket,
}: {
  chatId: string;
  receiverId: string;
  socket: WebSocket;
}) {
  const router = useRouter();
  const message = useRef<HTMLTextAreaElement>(null);
  const { pending } = useFormStatus();

  async function handleSendMessage(e?: FormEvent) {
    e?.preventDefault();

    if (message.current?.value && message.current?.value.length < 1) return;

    const payload = JSON.stringify({
      event: "new_message",
      chatId,
      text: message.current?.value,
      receiverId,
    });
    socket.send(payload);

    if (message.current?.value) message.current.value = "";
    router.refresh();
  }

  return (
    <div className="sticky bottom-0 mb-20 lg:mb-0 px-2 pb-2 border-r border-gray-100 flex gap-2 items-center">
      <div className="w-full relative">
        <form onSubmit={handleSendMessage}>
          <Textarea rows={5} placeholder="your message" ref={message} />
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
