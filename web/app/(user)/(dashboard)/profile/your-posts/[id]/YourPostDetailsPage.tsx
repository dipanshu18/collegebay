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
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPost } from "@/api/queries";
import { deletePost, postSold } from "@/api/mutations";

export default function YourPostDetailsPage({ id }: { id: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSold, setOpenSold] = useState(false);

  const postSoldMutation = useMutation({
    mutationFn: () => postSold(id),
    onSuccess: () => {
      router.replace("/profile");
      router.refresh();
    },
  });

  const deletePostMutation = useMutation({
    mutationKey: ["deleteUserPost", id],
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: () => {
      queryClient.resetQueries({
        queryKey: ["userPosts"],
      });
      router.refresh();
      router.replace("/profile");
    },
  });

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userPostDetails", id],
    queryFn: () => fetchPost(id),
  });

  if (isError && !isLoading) {
    return <h1>Error while fetching your post...</h1>;
  }

  return (
    <>
      {!isLoading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 place-items-center space-y-10 md:space-y-0 md:space-x-10">
            <div className="w-full my-5 col-span-2">
              <ImageCarousel images={post?.images!} />
            </div>
            <div className="space-y-3 w-full my-10">
              <h1 className="text-2xl font-bold">{post?.title}</h1>
              <p className="text-sm text-neutral-700 dark:text-neutral-200 text-wrap">
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
                    Make changes to your listing here. Click save when you{`'`}
                    re done.
                  </DialogDescription>
                </DialogHeader>
                <EditProductListingForm post={post} />
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
                        disabled={deletePostMutation.isPending}
                        className="w-20 flex gap-4"
                        variant="destructive"
                        onClick={async (e) => {
                          e.preventDefault();

                          await deletePostMutation.mutateAsync(id);
                        }}
                      >
                        {deletePostMutation.isPending && <Spinner />} Yes
                      </Button>
                      <Button
                        disabled={deletePostMutation.isPending}
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
                <Button
                  className="w-full dark:bg-neutral-600"
                  variant="outline"
                >
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
                        disabled={postSoldMutation.isPending}
                        className="w-20 flex gap-4"
                        variant="destructive"
                        onClick={(e) => {
                          e.preventDefault();

                          postSoldMutation.mutate();
                        }}
                      >
                        {postSoldMutation.isPending && <Spinner />} Yes
                      </Button>
                      <Button
                        disabled={postSoldMutation.isPending}
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
            <h1 className="text-lg font-extrabold">
              Messages for this product
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 my-5">
              <Card className="p-6 w-full space-y-5 dark:bg-inherit dark:border-neutral-200">
                <CardHeader className="p-0">
                  <Image
                    src={"/Logo.png"}
                    alt="User profile photo"
                    width={50}
                    height={50}
                    className="object-cover border border-black dark:border-neutral-200 rounded-full w-28 h-28"
                  />
                </CardHeader>
                <CardTitle className="font-normal">
                  Messaged User Name
                </CardTitle>
                <CardFooter className="p-0">
                  <Button>Message</Button>
                </CardFooter>
              </Card>

              <Card className="p-6 w-full space-y-5 dark:bg-inherit dark:border-neutral-200">
                <CardHeader className="p-0">
                  <Image
                    src={"/Logo.png"}
                    alt="User profile photo"
                    width={50}
                    height={50}
                    className="object-cover border border-black dark:border-neutral-200 rounded-full w-28 h-28"
                  />
                </CardHeader>
                <CardTitle className="font-normal">
                  Messaged User Name
                </CardTitle>
                <CardFooter className="p-0">
                  <Button>Message</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </>
      )}
    </>
  );
}
