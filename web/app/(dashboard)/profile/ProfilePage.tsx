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
import { UserRequest } from "@/app/(dashboard)/others-request/RequestsPage";
import { cn } from "@/lib/utils";
import { Post } from "@/app/(dashboard)/home/PostPage";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProfile | undefined>(undefined);
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [requests, setRequests] = useState<UserRequest[]>([]);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function fetchUser() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/v1/user", {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = await response.data;
        setUser(data.user);
        return;
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        const error = await e.response?.data.msg;
        return toast.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchPosts() {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/v1/posts/user",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const data = await response.data.posts;
        setPosts(data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  }

  async function fetchRequests() {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/v1/requests/user",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setRequests(response.data.requests);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteRequest(requestId: string) {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:5000/api/v1/requests/${requestId}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const data = await response.data.msg;
        toast.success(data);
        fetchRequests();
        router.refresh();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center my-10">
        <Spinner />
      </div>
    );
  }

  async function deleteUser(e: FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.delete("http://localhost:5000/api/v1/user", {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = await response.data.msg;

        toast.success(data);
        router.replace("/login");
        setDeleteOpen(false);
        return router.refresh();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = await error.response?.data.msg;

        toast.error(errorData);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10">
      {!loading ? (
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
                  <UpdateProfileForm
                    user={user!}
                    setOpen={setUpdateOpen}
                    refetch={fetchUser}
                  />
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
                        disabled={loading}
                        onClick={deleteUser}
                        variant="destructive"
                      >
                        {loading && <Spinner />} Yes 🥺
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

          <div className="text-left">
            <div className="my-10">
              <div>
                <h1 className="text-2xl font-semibold">Your Posts</h1>
                <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                  {posts.length > 0 ? (
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
                          {post.description}
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
              </div>
              <div className="my-10">
                <h1 className="text-2xl font-semibold">Your Requests</h1>
                <div
                  className={cn(
                    "py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full"
                  )}
                >
                  {requests.length > 0 ? (
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
                        <CardDescription className="px-6">
                          {request.description}
                        </CardDescription>
                        <CardFooter>
                          <Button
                            onClick={() => deleteRequest(request.id)}
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
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
