"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

import { deletePost, postSold } from "@/actions/user";

export function ConfirmButton({
  postId,
  type,
}: {
  postId: string;
  type: "delete" | "sold";
}) {
  const { pending } = useFormStatus();

  return (
    <form
      action={async () => {
        type === "delete" ? deletePost(postId) : postSold(postId);
      }}
    >
      <Button
        disabled={pending}
        className="w-20 flex gap-4"
        variant={type === "delete" ? "destructive" : "default"}
      >
        {pending ? "Submitting..." : "Confirm"}
      </Button>
    </form>
  );
}
