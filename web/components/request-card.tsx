"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { formatDistanceToNow } from "date-fns";

import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import type { IUserRequest } from "@/actions/types";
import { upVoteRequest } from "@/actions/request";
import { toast } from "sonner";
import { UserRequestActionsBtn } from "./user-request-actions-btn";

export function RequestCard({
  type,
  request,
}: {
  type: "home" | "profile";
  request: IUserRequest;
}) {
  const router = useRouter();

  async function handleUpVote(e: FormEvent) {
    e.preventDefault();

    const response = await upVoteRequest(request.id);

    if (response?.error) return toast.error(response.error);

    router.refresh();
  }

  return (
    <Card className="space-y-2 flex flex-col w-full border-0 bg-gray-50 hover:shadow-md transition-all duration-300">
      <Image
        src={request.image}
        width={1080}
        height={1920}
        quality={100}
        priority
        alt="Product image"
        className="w-full object-contain rounded-t-md h-52 bg-white"
      />
      <div className="flex-1">
        <CardTitle className="px-6 my-2 flex items-center justify-between">
          <div className="text-secondary">{request.title} </div>
          <Button
            onClick={handleUpVote}
            className="flex items-center gap-2 bg-primary text-white hover:bg-accent"
          >
            <ChevronUp /> {request._count.upVotes}
          </Button>
        </CardTitle>
        <CardDescription className="px-6 space-y-5 text-primary">
          {request.description}
        </CardDescription>
      </div>
      <div className="p-5 pt-0 space-y-3">
        <div className="flex max-w-sm items-center gap-5">
          <div className="flex w-10 h-10 rounded-full">
            <Image
              src={request.user.image}
              width={200}
              height={200}
              priority
              alt={`${request.user.name} profile picture`}
              className="w-full object-cover rounded-full "
            />
          </div>
          <div>
            <h1 className="text-md font-bold text-primary">
              {request.user.name}
            </h1>
            <p className="text-xs text-accent">
              Created{" "}
              {formatDistanceToNow(new Date(request.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="w-full">
          <UserRequestActionsBtn type={type} id={request.id} />
        </div>
      </div>
    </Card>
  );
}
