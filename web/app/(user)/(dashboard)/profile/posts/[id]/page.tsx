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
import { MarkPostSoldForm } from "@/components/mark-post-sold-form";
import type { IChat, IPost } from "@/actions/types";
import Link from "next/link";
import { ArrowLeft, Star } from "lucide-react";
import { ConfirmButton } from "@/components/confirm-btn";
import { getAllChats } from "@/actions/chat";
import { cookies } from "next/headers";

export default async function UserPostDetails({
  params,
}: {
  params: { id: string };
}) {
  const userId = cookies().get("uid")?.value;

  const response = await fetchPost(params.id);
  const fetchChatResponse = await getAllChats();
  let post: IPost | undefined = undefined;
  let chats: IChat[] = [];

  if (response?.error) return toast.error(response.error);

  if (response?.success) {
    post = response.success.post;
    console.log(post?.feeback);
  }

  if (fetchChatResponse?.success) {
    chats = fetchChatResponse?.success;
  }

  chats = chats.filter(
    (chat) => chat.participants.filter((p) => p.id !== userId)[0]
  );

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
      <div className="flex flex-col xl:flex-row">
        <div className="w-full max-w-lg mx-auto px-14">
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

        {/* <Dialog>
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
            <ConfirmButton postId={params.id} />
          </DialogContent>
        </Dialog> */}

        {post?.isAvailable && chats.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full dark:bg-neutral-600" variant="outline">
                Sold
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] dark:bg-black">
              <DialogHeader>
                <DialogTitle className="tracking-normal text-lg font-semibold">
                  Are you sure you want to set your product listing as sold?
                </DialogTitle>
                <DialogDescription className="space-y-2">
                  <MarkPostSoldForm postId={params.id} chats={chats} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {post?.feeback && (
        <div className="pl-5">
          <h1 className="text-xl font-bold text-primary mb-2">Feedback</h1>
          <div className="flex items-center gap-2">
            <p className="flex items-center text-yellow-400">
              {[...Array(post.feeback.rating)].map((_, idx) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <Star key={idx} />
              ))}{" "}
            </p>
            {post.feeback.text && (
              <p className="text-lg">{post.feeback.text}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
