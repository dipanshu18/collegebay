"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ApproveBtn({ type }: { type: "post" | "request" }) {
  return <Button className="w-full">Approve</Button>;
}

export function RejectMessageForm({ type }: { type: "post" | "request" }) {
  return (
    <form className="grid gap-2">
      <Textarea rows={7} placeholder="enter the reason for rejection" />

      <Button type="submit" className="mt-5">
        Submit
      </Button>
    </form>
  );
}
