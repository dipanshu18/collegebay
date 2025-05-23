"use client";

import {
  approvePost,
  approveRequest,
  rejectPost,
  rejectRequest,
} from "@/actions/admin";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

export function ApproveBtn({
  type,
  id,
}: {
  type: "post" | "request";
  id: string;
}) {
  const { pending } = useFormStatus();
  const router = useRouter();

  async function handleApprovePostOrRequest(e: FormEvent) {
    e.preventDefault();

    const response =
      type === "post" ? await approvePost(id) : await approveRequest(id);

    if (response?.error) {
      toast.error(response.error);
      return;
    }

    toast.success(response);
    router.replace("/admin/dashboard");
    return;
  }

  return (
    <form className="w-full">
      <Button
        onClick={handleApprovePostOrRequest}
        disabled={pending}
        className="w-full"
      >
        {pending ? "Submitting..." : "Approve"}
      </Button>
    </form>
  );
}

export function RejectMessageForm({
  type,
  id,
}: {
  type: "post" | "request";
  id: string;
}) {
  const { pending } = useFormStatus();
  const router = useRouter();
  const [reason, setReason] = useState("");

  async function handleAdminRejectWithReason(e: FormEvent) {
    e.preventDefault();

    try {
      const response =
        type === "post"
          ? await rejectPost(id, reason)
          : await rejectRequest(id, reason);

      if (response?.error) {
        toast.error(response.error);

        return;
      }

      toast.success(response);
      setReason("");
      router.replace("/admin/dashboard");
      return;
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = await error.response?.data.msg;
        toast.error(errorData);
        return;
      }
    }
  }

  return (
    <form className="grid gap-2" onSubmit={handleAdminRejectWithReason}>
      <Textarea
        rows={7}
        onChange={(e) => setReason(e.target.value)}
        placeholder="enter the reason for rejection"
      />

      <Button disabled={pending} type="submit" className="mt-5">
        {pending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
