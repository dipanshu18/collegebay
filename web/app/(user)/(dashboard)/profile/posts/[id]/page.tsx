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
    <div className="p-5">
      <div className="">
        <div className="w-full px-10">
          <ImageCarousel images={post?.images as string[]} />
        </div>
        <div className="space-y-2 w-full">
          <h1 className="text-2xl font-bold">{post?.title}</h1>
          <p className="text-sm text-neutral-800 text-wrap">
            {post?.description}
          </p>
          <p className="font-extrabold text-xl">Rs. {post?.price}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-5">
        {!post?.isApproved && (
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
              <EditProductListingForm post={post as IPost} />
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
    </div>
  );
}
