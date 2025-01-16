"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

import { ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUserRequest } from "@/api/types";
import { upVoteRequest } from "@/api/mutations";

export function RequestCard({ request }: { request: IUserRequest }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const upVoteRequestMutation = useMutation({
    mutationKey: ["upVoteRequest", request.id],
    mutationFn: () => upVoteRequest(request.id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["requests"],
      });

      router.refresh();
      return;
    },
  });

  return (
    <Card className="space-y-2 max-w-sm w-full border-0 hover:shadow-lg transition-all duration-300 bg-neutral-50">
      <Image
        src={`https://dzgbuobd25m4d.cloudfront.net/${request.image}`}
        width={1080}
        height={1920}
        quality={100}
        priority
        alt="Product image"
        className="w-full object-contain h-52 bg-white"
      />
      <CardTitle className="px-6 flex items-center justify-between">
        <div>{request.title} </div>
        <Button
          onClick={(e) => {
            e.preventDefault();

            upVoteRequestMutation.mutate();
          }}
          className="flex items-center gap-2"
        >
          <ChevronUp /> {request._count.upVotes}
        </Button>
      </CardTitle>
      <CardDescription className="px-6 space-y-5">
        <p>{request.description}</p>
      </CardDescription>
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
