"use client";

import { useFormStatus } from "react-dom";
import type { FormEvent } from "react";

import { markAsRead } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function MarkAsReadBtn({ id }: { id: string }) {
  const { pending } = useFormStatus();
  const router = useRouter();

  async function handleMarkAsRead(e: FormEvent) {
    e.preventDefault();

    await markAsRead(id);

    router.refresh();
  }

  return (
    <form onSubmit={handleMarkAsRead}>
      <Button
        disabled={pending}
        type="submit"
        className="bg-primary hover:bg-accent text-white"
      >
        Mark as read
      </Button>
    </form>
  );
}
