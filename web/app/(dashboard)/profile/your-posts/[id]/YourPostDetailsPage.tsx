"use client";

import Image from "next/image";
import EditProductListingForm from "./EditProductListingForm";
import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Post } from "@/app/(dashboard)/home/PostPage";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function YourPostDetailsPage({ id }: { id: string }) {
  const router = useRouter();

  const [post, setPost] = useState<Post>();
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSold, setOpenSold] = useState(false);

  async function fetchPost() {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/v1/posts/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = await response.data.post;
        setPost(data);
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

  async function postSold(postId: string) {
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:5000/api/v1/posts/${postId}/sold`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = await response.data.msg;
        toast.success(data);
        router.replace("/profile");
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

  async function deletePost(postId: string) {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:5000/api/v1/posts/${postId}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = await response.data.msg;
        toast.success(data);
        router.replace("/profile");
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

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center space-y-10 md:space-y-0 md:space-x-10">
        <div className="w-full my-5 col-span-2">
          <ImageCarousel images={post?.images!} />
        </div>
        <div className="space-y-3 w-full my-10">
          <h1 className="text-2xl font-bold">{post?.title}</h1>
          <p className="text-sm text-slate-700 dark:text-slate-200 text-wrap">
            {post?.description}
          </p>
          <p className="font-extrabold text-xl">Rs. {post?.price}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-10 md:my-16">
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogTrigger asChild>
            <Button>Edit Post</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-black">
            <DialogHeader>
              <DialogTitle>Edit product listing</DialogTitle>
              <DialogDescription>
                Make changes to your listing here. Click save when you{`'`}re
                done.
              </DialogDescription>
            </DialogHeader>
            <EditProductListingForm post={post!} />
          </DialogContent>
        </Dialog>

        <Dialog open={openDelete} onOpenChange={setOpenDelete}>
          <DialogTrigger asChild>
            <Button className="w-full" variant="destructive">
              Delete Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-black">
            <DialogHeader>
              <DialogTitle>Delete your post</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete your product listing? (The
                messages from others user to buy these products will also be
                deleted!)
                <div className="flex justify-end mt-5 gap-2 w-full">
                  <Button
                    disabled={loading}
                    className="w-20 flex gap-4"
                    variant="destructive"
                    onClick={async () => await deletePost(id)}
                  >
                    {loading && <Spinner />} Yes
                  </Button>
                  <Button
                    disabled={loading}
                    className="w-20"
                    onClick={() => {
                      setOpenDelete(false);
                    }}
                  >
                    No
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={openSold} onOpenChange={setOpenSold}>
          <DialogTrigger asChild>
            <Button className="w-full dark:bg-slate-600" variant="outline">
              Sold
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-black">
            <DialogHeader>
              <DialogTitle>Set your post as Sold</DialogTitle>
              <DialogDescription>
                Are you sure you want to set your product listing as sold?
                <div className="flex justify-end mt-5 gap-2 w-full">
                  <Button
                    disabled={loading}
                    className="w-20 flex gap-4"
                    variant="destructive"
                    onClick={async () => await postSold(id)}
                  >
                    {loading && <Spinner />} Yes
                  </Button>
                  <Button
                    disabled={loading}
                    className="w-20"
                    onClick={() => {
                      setOpenSold(false);
                    }}
                  >
                    No
                  </Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h1 className="text-lg font-extrabold">Messages for this product</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 my-5">
          <Card className="p-6 w-full space-y-5 dark:bg-inherit dark:border-slate-200">
            <CardHeader className="p-0">
              <Image
                src={"/Logo.png"}
                alt="User profile photo"
                width={50}
                height={50}
                className="object-cover border border-black dark:border-slate-200 rounded-full w-28 h-28"
              />
            </CardHeader>
            <CardTitle className="font-normal">Messaged User Name</CardTitle>
            <CardFooter className="p-0">
              <Button>Message</Button>
            </CardFooter>
          </Card>

          <Card className="p-6 w-full space-y-5 dark:bg-inherit dark:border-slate-200">
            <CardHeader className="p-0">
              <Image
                src={"/Logo.png"}
                alt="User profile photo"
                width={50}
                height={50}
                className="object-cover border border-black dark:border-slate-200 rounded-full w-28 h-28"
              />
            </CardHeader>
            <CardTitle className="font-normal">Messaged User Name</CardTitle>
            <CardFooter className="p-0">
              <Button>Message</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
}
