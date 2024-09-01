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
} from "./ui/dialog";
import { Button } from "./ui/button";
import UpdateProfileForm from "./UpdateProfileForm";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserProfile | undefined>(undefined);

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

  useEffect(() => {
    fetchUser();
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
                className="w-52 h-52 object-cover rounded-full border dark:border-slate-100"
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
                  <Button className="dark:bg-slate-600" variant="outline">
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] dark:bg-black">
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
                  <Button variant="destructive">
                    {loading && <Spinner />} Delete Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] dark:bg-black">
                  <DialogHeader>
                    <DialogTitle>
                      Are you sure you want to delete your account
                    </DialogTitle>
                    <DialogDescription className="flex gap-5">
                      <p>We are sad you are leaving us 😔</p>
                      <Button onClick={deleteUser} variant="destructive">
                        Yes 🥺
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
                <h1 className="text-xl font-semibold">Your Posts</h1>
                <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                  <Card className="space-y-2 w-full dark:bg-inherit dark:border-slate-200">
                    <CardHeader>
                      <Image
                        src={"/Logo.png"}
                        width={100}
                        height={100}
                        alt="Product image"
                        className="w-full object-cover h-52"
                      />
                    </CardHeader>
                    <CardTitle className="px-6">Product title</CardTitle>
                    <CardDescription className="px-6">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Voluptatem magnam, quod sit sapiente similique quaerat ad
                      neque qui illo fugit eos veritatis distinctio deleniti
                      labore obcaecati voluptates. Sed, necessitatibus maxime.
                    </CardDescription>
                    <CardFooter>
                      <Link href={"/profile/your-posts/:id"}>
                        <Button>More details</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card className="space-y-2 dark:bg-inherit dark:border-slate-200">
                    <CardHeader>
                      <Image
                        src={"/Logo.png"}
                        width={50}
                        height={50}
                        alt="Product image"
                        className="w-full object-cover h-52"
                      />
                    </CardHeader>
                    <CardTitle className="px-6">Product title</CardTitle>
                    <CardDescription className="px-6">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Voluptatem magnam, quod sit sapiente similique quaerat ad
                      neque qui illo fugit eos veritatis distinctio deleniti
                      labore obcaecati voluptates. Sed, necessitatibus maxime.
                    </CardDescription>
                    <CardFooter>
                      <Link href={"/profile/your-posts/:id"}>
                        <Button>More details</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card className="space-y-2 dark:bg-inherit dark:border-slate-200">
                    <CardHeader>
                      <Image
                        src={"/Logo.png"}
                        width={50}
                        height={50}
                        alt="Product image"
                        className="w-full object-cover h-52"
                      />
                    </CardHeader>
                    <CardTitle className="px-6">Product title</CardTitle>
                    <CardDescription className="px-6">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Voluptatem magnam, quod sit sapiente similique quaerat ad
                      neque qui illo fugit eos veritatis distinctio deleniti
                      labore obcaecati voluptates. Sed, necessitatibus maxime.
                    </CardDescription>
                    <CardFooter>
                      <Link href={"/profile/your-posts/:id"}>
                        <Button>More details</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              <div className="my-10">
                <h1 className="text-xl font-semibold">Your Requests</h1>
                <div className="py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
                  <Card className="space-y-2 dark:bg-inherit dark:border-slate-200">
                    <CardHeader>
                      <Image
                        src={"/Logo.png"}
                        width={50}
                        height={50}
                        alt="Product image"
                        className="w-full object-cover h-52"
                      />
                    </CardHeader>
                    <CardTitle className="px-6">Product title</CardTitle>
                    <CardDescription className="px-6">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Voluptatem magnam, quod sit sapiente similique quaerat ad
                      neque qui illo fugit eos veritatis distinctio deleniti
                      labore obcaecati voluptates. Sed, necessitatibus maxime.
                    </CardDescription>
                    <CardFooter>
                      <Button variant="destructive">Delete Request</Button>
                    </CardFooter>
                  </Card>
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
