"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending}
      className="w-20 flex gap-4"
      variant="destructive"
    >
      {pending ? "Submitting..." : "Confirm"}
    </Button>
  );
}
