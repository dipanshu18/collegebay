"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

import { deletePost, postSold } from "@/actions/post";
import type { FormEvent } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ConfirmButton({
  postId,
  type,
}: {
  postId: string;
  type: "delete" | "sold";
}) {
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

  async function handlePostSold(e: FormEvent) {
    e.preventDefault();

    const response = await postSold(postId);

    if (response?.error) {
      const errorMsg = response.error;
      return toast.error(errorMsg);
    }

    toast.success(response?.success);
    return router.push("/profile");
  }

  return (
    <form onSubmit={type === "delete" ? handlePostDelete : handlePostSold}>
      <Button
        disabled={pending}
        className="w-20 flex gap-4"
        type="submit"
        variant={type === "delete" ? "destructive" : "default"}
      >
        {pending ? "Submitting..." : "Confirm"}
      </Button>
    </form>
  );
}
