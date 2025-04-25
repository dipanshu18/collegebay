"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

import { deletePost, postSold } from "@/actions/post";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ConfirmButton({ postId }: { postId: string }) {
  const router = useRouter();
  const { pending } = useFormStatus();

  async function handlePostDelete(e: FormEvent) {
    e.preventDefault();

    const response = await deletePost(postId);

    if (response?.error) {
      const errorMsg = response.error;
      return toast.error(errorMsg);
    }

    toast.success(response?.success);
    return router.push("/profile");
  }

  return (
    <form onSubmit={handlePostDelete}>
      <Button
        disabled={pending}
        className="w-20 flex gap-4"
        type="submit"
        variant={"destructive"}
      >
        {pending ? "Deleting..." : "Confirm"}
      </Button>
    </form>
  );
}
