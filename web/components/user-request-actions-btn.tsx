"use client";

import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/components/lib/utils";
import { Contact, Trash2 } from "lucide-react";
import { deleteRequest } from "@/actions/request";

export function UserRequestActionsBtn({
  type,
  id,
}: {
  type: "profile" | "home";
  id: string;
}) {
  const router = useRouter();
  const { pending } = useFormStatus();

  async function handleDeleteRequest(e: FormEvent) {
    e.preventDefault();

    const response = await deleteRequest(id);

    if (response?.error) {
      const errorMsg = response.error;
      return toast.error(errorMsg);
    }

    toast.success(response?.success);
    return router.refresh();
  }

  return (
    <form onSubmit={type === "profile" ? handleDeleteRequest : undefined}>
      <Button
        type="submit"
        disabled={pending}
        className={cn(
          "w-full",
          type !== "profile" && "bg-primary text-white hover:bg-accent"
        )}
        variant={type === "profile" ? "destructive" : "default"}
      >
        <div className="flex items-center gap-2">
          {pending ? (
            "Deleting..."
          ) : (
            <>
              <Trash2 /> Delete
            </>
          )}
        </div>
      </Button>
    </form>
  );
}
