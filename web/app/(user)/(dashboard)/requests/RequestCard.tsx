"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChevronUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { IUserRequest } from "@/api/types";
import { upVoteRequest } from "@/api/mutations";

export default function RequestCard({ request }: { request: IUserRequest }) {
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
    <Card className="space-y-5 w-full dark:bg-inherit dark:border-neutral-200">
      <CardHeader>
        <Image
          src={`https://dzgbuobd25m4d.cloudfront.net/${request.image}`}
          width={500}
          height={500}
          priority
          alt="Product image"
          className="w-full object-cover h-52"
        />
      </CardHeader>
      <CardTitle className="px-6">{request.title}</CardTitle>
      <CardDescription className="px-6 space-y-5">
        <p>{request.description}</p>
        <p>
          Created{" "}
          {formatDistanceToNow(new Date(request.createdAt), {
            addSuffix: true,
          })}
        </p>
      </CardDescription>
      <CardFooter className="gap-5">
        <Button
          onClick={(e) => {
            e.preventDefault();

            upVoteRequestMutation.mutate();
          }}
          className="flex items-center gap-2"
        >
          <ChevronUp /> {request._count.upVotes}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Contact</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] dark:bg-neutral-900">
            <DialogHeader>
              <DialogTitle>
                <span className="font-light">Contact</span> {request.user.name}
              </DialogTitle>
              <DialogDescription>
                <div className="space-y-5 md:p-10 text-wrap">
                  <div className="flex w-48 h-48 rounded-full mx-auto">
                    <Image
                      src={`https://dzgbuobd25m4d.cloudfront.net/${request.user.image}`}
                      width={200}
                      height={200}
                      priority
                      alt="Product image"
                      className="w-full h-full object-cover rounded-full "
                    />
                  </div>
                  <p>
                    Name:{" "}
                    <span className="text-xl font-extrabold text-black dark:text-white">
                      {request.user.name}
                    </span>
                  </p>
                  <p>
                    College:{" "}
                    <span className="text-xl font-extrabold text-black dark:text-white">
                      {request.user.college}
                    </span>
                  </p>
                  <p>
                    Phone No:{" "}
                    <span className="text-xl font-extrabold text-black dark:text-white">
                      (+91){request.user.phoneNo}
                    </span>
                  </p>
                  <p>
                    Email:{" "}
                    <span className="text-xl font-extrabold text-black dark:text-white">
                      {request.user.email}
                    </span>
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
