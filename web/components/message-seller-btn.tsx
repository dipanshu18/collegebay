"use client";

import type { FormEvent } from "react";
import { useFormStatus } from "react-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { startChat } from "@/actions/chat";
import { useRouter } from "next/navigation";

export function MessageSellerBtn({ sellerId }: { sellerId: string }) {
  const router = useRouter();
  const { pending } = useFormStatus();

  async function handleMessageSeller(e: FormEvent) {
    e.preventDefault();

    const response = await startChat(sellerId);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    if (response?.success === "REDIRECT") {
      return router.push(`/messages/${response.chatId}`);
    }

    return router.push(`/messages/${response?.success}`);
  }

  return (
    <form onSubmit={handleMessageSeller}>
      <Button
        disabled={pending}
        className="w-full max-w-md bg-primary text-white hover:bg-accent"
      >
        {pending ? (
          "Initiating chat"
        ) : (
          <>
            <Send className="mr-2" /> Message seller
          </>
        )}
      </Button>
    </form>
  );
}
