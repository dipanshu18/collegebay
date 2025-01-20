"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { formatDistanceToNow } from "date-fns";

import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import type { IUserRequest } from "@/actions/types";
import { upVoteRequest } from "@/actions/user";
import { toast } from "sonner";

export function RequestCard({ request }: { request: IUserRequest }) {
  const router = useRouter();

  async function handleUpVote(e: FormEvent) {
    e.preventDefault();

    const response = await upVoteRequest(request.id);

    if (response?.error) return toast.error(response.error);

    router.refresh();
  }

  return (
    <Card className="space-y-2 flex flex-col w-full border-0 hover:shadow-lg transition-all duration-300 bg-neutral-50">
      <Image
        src={`https://dzgbuobd25m4d.cloudfront.net/${request.image}`}
        width={1080}
        height={1920}
        quality={100}
        priority
        alt="Product image"
        className="w-full object-contain rounded-t-md h-52 bg-white"
      />
      <div className="flex-1">
        <CardTitle className="px-6 flex items-center justify-between">
          <div>{request.title} </div>
          <Button onClick={handleUpVote} className="flex items-center gap-2">
            <ChevronUp /> {request._count.upVotes}
          </Button>
        </CardTitle>
        <CardDescription className="px-6 space-y-5">
          {request.description}
        </CardDescription>
      </div>
      <div className="p-5 pt-0 space-y-2">
        <div className="flex max-w-sm items-center gap-5">
          <div className="flex w-16 h-16 rounded-full">
            <Image
              src={`https://dzgbuobd25m4d.cloudfront.net/${request.user.image}`}
              width={200}
              height={200}
              priority
              alt="Product image"
              className="w-full object-cover rounded-full "
            />
          </div>
          <div>
            <h1 className="text-md font-bold">{request.user.name}</h1>
            <p className="text-xs">
              Created{" "}
              {formatDistanceToNow(new Date(request.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="w-full">
          <Button className="w-full">Contact</Button>
        </div>
      </div>
    </Card>
  );
}
