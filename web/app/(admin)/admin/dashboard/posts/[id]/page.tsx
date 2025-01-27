import { fetchPost } from "@/actions/user";
import { ImageCarousel } from "@/components/image-carousel";

import type { IPost } from "@/actions/types";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApproveBtn, RejectMessageForm } from "@/components/admin-action-btn";

export default async function AdminPostDetails({
  params,
}: {
  params: { id: string };
}) {
  const post = (await fetchPost(params.id)) as IPost;

  return (
    <div className="p-4 h-full">
      <div className="flex flex-col md:flex-row gap-10 p-5 items-center">
        <div className="w-full max-w-lg mx-auto p-5">
          <ImageCarousel images={post.images} />
        </div>
        <div className="w-full space-y-3">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {post.title}
          </h1>
          <p className="text-neutral-700 dark:text-neutral-200 text-wrap">
            {post.description}
          </p>
          <p className="font-extrabold text-2xl">Rs. {post.price}</p>

          <div className="flex items-center w-full gap-5">
            <ApproveBtn type="post" id={params.id} />
            <Dialog>
              <DialogTrigger className="w-full bg-red-500 text-neutral-50 hover:bg-red-700 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90 py-2 rounded-md">
                Reject
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enter rejection reason</DialogTitle>
                </DialogHeader>
                <div>
                  <RejectMessageForm type="post" id={params.id} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* <div></div> */}
    </div>
  );
}
