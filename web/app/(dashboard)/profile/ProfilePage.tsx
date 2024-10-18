"use client";

import { UserProfile } from "@/types";
import axios, { AxiosError } from "axios";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UpdateProfileForm from "./UpdateProfileForm";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  fetchUserPosts,
  fetchUserProfile,
  fetchUserRequests,
} from "@/api/queries";
import { IPost, IUserProfile, IUserRequest } from "@/api/types";
import { deleteRequest, deleteUser } from "@/api/mutations";
import { queryClient } from "@/app/providers";

export default function ProfilePage() {
  const router = useRouter();
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: user, isLoading: userProfileLoading } = useQuery<IUserProfile>({
    queryFn: () => fetchUserProfile(),
    queryKey: ["userProfile"],
  });

  const { data: posts, isLoading: userPostsLoading } = useQuery<IPost[]>({
    queryFn: () => fetchUserPosts(),
    queryKey: ["userPosts"],
  });

  const { data: requests, isLoading: userRequestsLoading } = useQuery<
    IUserRequest[]
  >({
    queryFn: () => fetchUserRequests(),
    queryKey: ["userRequests"],
    staleTime: 0,
  });

  const deleteUserMutation = useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,
    onSuccess: () => {
      router.replace("/login");
      setDeleteOpen(false);
      router.refresh();
      return;
    },
  });

  const deleteRequestMutation = useMutation({
    mutationKey: ["deleteRequest"],
    mutationFn: (requestId: string) => deleteRequest(requestId),
  });

  return (
    <div className="space-y-10">
      <>
        {!userProfileLoading ? (
          <>
            <div className="max-w-2xl mx-auto mt-5 border shadow rounded-md p-5">
              <div className="w-full flex justify-center items-center">
                <Image
                  src={`https://dzgbuobd25m4d.cloudfront.net/${user?.image}`}
                  alt="User profile photo"
                  width={300}
                  height={300}
                  priority
                  quality={100}
                  className="w-52 h-52 object-cover rounded-full border dark:border-neutral-100"
                />
              </div>
              <div className="text-left col-span-2 py-5 w-full space-y-5">
                <p className="text-lg font-extrabold">
                  <span className="font-extralight">Name:</span> {user?.name}
                </p>
                <p className="text-lg font-extrabold overflow-x-auto">
                  <span className="font-extralight">Email:</span> {user?.email}
                </p>
                <p className="text-lg font-extrabold">
                  <span className="font-extralight">College:</span>{" "}
                  {user?.college}
                </p>
                <p className="text-lg font-extrabold">
                  <span className="font-extralight">Phone no:</span>{" "}
                  {user?.phoneNo}
                </p>
              </div>
              <div className="flex justify-between gap-5">
                <Dialog open={updateOpen} onOpenChange={setUpdateOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] dark:bg-neutral-950">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when you
                        {`'`}
                        re done.
                      </DialogDescription>
                    </DialogHeader>
                    <UpdateProfileForm user={user!} setOpen={setUpdateOpen} />
                  </DialogContent>
                </Dialog>

                <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] dark:bg-black">
                    <DialogHeader>
                      <DialogTitle>
                        Are you sure you want to delete your account
                      </DialogTitle>
                      <DialogDescription className="flex gap-5">
                        <p>We are sad you are leaving us 😔</p>
                        <Button
                          disabled={deleteUserMutation.isPending}
                          onClick={async (e) => {
                            e.preventDefault();

                            deleteUserMutation.mutateAsync();
                          }}
                          variant="destructive"
                        >
                          {deleteUserMutation.isPending && <Spinner />} Yes 🥺
                        </Button>
                        <Button onClick={() => setDeleteOpen(false)}>
                          No 😄
                        </Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center my-10">
            <Spinner />
          </div>
        )}

        <div className="text-left">
          <div className="my-10">
            <div>
              <h1 className="text-2xl font-semibold">Your Posts</h1>
              {!userPostsLoading ? (
                <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                  {posts && posts.length > 0 ? (
                    posts.map((post) => (
                      <Card
                        key={post.id}
                        className="space-y-2 w-full dark:bg-inherit dark:border-neutral-200"
                      >
                        <CardHeader>
                          <Image
                            src={`https://dzgbuobd25m4d.cloudfront.net/${post.images[0]}`}
                            width={500}
                            height={500}
                            alt="Product image"
                            priority
                            quality={100}
                            className="w-full object-cover h-52"
                          />
                        </CardHeader>
                        <CardTitle className="px-6">{post.title}</CardTitle>
                        <CardDescription className="px-6">
                          {post.description.slice(0, 55) + "..."}
                        </CardDescription>
                        <CardFooter>
                          <Link href={`/profile/your-posts/${post.id}`}>
                            <Button>More details</Button>
                          </Link>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <h1 className="col-span-2 text-xl font-medium">
                      You have not created any posts yet
                    </h1>
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center my-10">
                  <Spinner />
                </div>
              )}
            </div>

            <div className="my-10">
              <h1 className="text-2xl font-semibold">Your Requests</h1>
              {!userRequestsLoading ? (
                <div
                  className={cn(
                    "py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
                  )}
                >
                  {requests && requests.length > 0 ? (
                    requests.map((request) => (
                      <Card
                        className="space-y-2 dark:bg-inherit dark:border-neutral-200"
                        key={request.id}
                      >
                        <CardHeader>
                          <Image
                            src={`https://dzgbuobd25m4d.cloudfront.net/${request.image}`}
                            width={500}
                            height={500}
                            alt="Product image"
                            priority
                            quality={100}
                            className="w-full object-cover h-52"
                          />
                        </CardHeader>
                        <CardTitle className="px-6">{request.title}</CardTitle>
                        <CardDescription className="px-6 text-wrap">
                          {request.description}
                        </CardDescription>
                        <CardFooter>
                          <Button
                            disabled={deleteRequestMutation.isPending}
                            onClick={async (e) => {
                              e.preventDefault();

                              await deleteRequestMutation.mutateAsync(
                                request.id
                              );

                              window.location.reload();
                            }}
                            variant="destructive"
                          >
                            Delete Request
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  ) : (
                    <h1 className="text-xl font-medium col-span-2">
                      You have not created any requests
                    </h1>
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center my-10">
                  <Spinner />
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
