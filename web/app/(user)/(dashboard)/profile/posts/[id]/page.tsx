import Image from "next/image";

import { Button } from "@/components/ui/button";
import { ImageCarousel } from "@/components/image-carousel";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { EditProductListingForm } from "@/components/edit-listing-form";
import { deletePost, fetchPost, postSold } from "@/actions/user";
import { ConfirmButton } from "@/components/confirm-button";
import type { IPost } from "@/actions/types";

export default async function UserPostDetails({
  params,
}: {
  params: { id: string };
}) {
  const userPost = (await fetchPost(params.id)) as IPost;

  return (
    <div className="my-5 p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center space-y-10 md:space-y-0 md:space-x-10">
        <div className="w-full px-10">
          <ImageCarousel images={userPost.images} />
        </div>
        <div className="space-y-3 w-full my-10">
          <h1 className="text-2xl font-bold">{userPost.title}</h1>
          <p className="text-sm text-neutral-700 dark:text-neutral-200 text-wrap">
            {userPost.description}
          </p>
          <p className="font-extrabold text-xl">Rs. {userPost.price}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-10 md:my-16">
        {!userPost.isApproved && (
          <Dialog>
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
              <EditProductListingForm post={userPost} />
            </DialogContent>
          </Dialog>
        )}

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" variant="destructive">
              Delete Post
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-black">
            <DialogHeader>
              <DialogTitle>Delete your post</DialogTitle>
              <DialogDescription className="space-y-2">
                <span>
                  Are you sure you want to delete your product listing?
                </span>

                <ConfirmButton postId={params.id} type="delete" />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full dark:bg-neutral-600" variant="outline">
              Sold
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] dark:bg-black">
            <DialogHeader>
              <DialogTitle>Set your post as Sold</DialogTitle>
              <DialogDescription className="space-y-2">
                <span>
                  Are you sure you want to set your product listing as sold?
                </span>
                <ConfirmButton postId={params.id} type="sold" />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
