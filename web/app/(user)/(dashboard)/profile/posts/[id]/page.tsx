import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ImageCarousel } from "@/components/image-carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { EditProductListingForm } from "@/components/edit-listing-form";
import { fetchPost } from "@/actions/post";
import { ConfirmButton } from "@/components/confirm-button";
import type { IPost } from "@/actions/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function UserPostDetails({
  params,
}: {
  params: { id: string };
}) {
  const response = await fetchPost(params.id);
  let post: IPost | undefined = undefined;

  if (response?.error) return toast.error(response.error);

  if (response?.success) {
    post = response.success;
  }

  return (
    <>
      <div className="pt-5 pl-5">
        <Link
          href={"/profile"}
          className="text-primary hover:bg-secondary hover:text-white transition-all duration-150 w-10 h-10 flex justify-center items-center rounded-full"
        >
          <ArrowLeft size={24} />
        </Link>
      </div>
      <div className="">
        <div className="w-full max-w-lg mx-auto px-12">
          <ImageCarousel images={post?.images as string[]} />
        </div>
        <div className="space-y-2 w-full px-5">
          <h1 className="text-2xl font-bold">{post?.title}</h1>
          <p className="text-sm text-neutral-800 text-wrap">
            {post?.description}
          </p>
          <p className="font-extrabold text-xl">Rs. {post?.price}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5 px-5">
        {!post?.isApproved && (
          <Link href={`/profile/posts/${post?.id}/edit`}>
            <Button className="w-full">Edit Post</Button>
          </Link>
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
              </DialogDescription>
            </DialogHeader>
            <ConfirmButton postId={params.id} type="delete" />
          </DialogContent>
        </Dialog>

        {post?.isAvailable && (
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
        )}
      </div>
    </>
  );
}
