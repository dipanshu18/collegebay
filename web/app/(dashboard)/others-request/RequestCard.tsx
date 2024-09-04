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
import { UserRequest } from "./RequestsPage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RequestCard({
  request,
  refetch,
}: {
  request: UserRequest;
  refetch: () => Promise<void>;
}) {
  const router = useRouter();

  async function upVoteRequest(requestId: string) {
    try {
      await axios.post(
        `http://localhost:5000/api/v1/requests/upvote/${requestId}`,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.msg);
      }
    } finally {
      refetch();
      router.refresh();
    }
  }

  return (
    <Card className="space-y-2 w-full dark:bg-inherit dark:border-slate-200">
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
      <CardDescription className="px-6">
        {request.description}
        <p>
          Created{" "}
          {formatDistanceToNow(new Date(request.createdAt), {
            addSuffix: true,
          })}
        </p>
      </CardDescription>
      <CardFooter className="gap-5">
        <Button
          onClick={() => upVoteRequest(request.id)}
          className="flex items-center gap-2"
        >
          <ChevronUp /> {request._count.upVotes}
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="dark:bg-slate-600" variant="outline">
              Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] dark:bg-black">
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
