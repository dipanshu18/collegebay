import Link from "next/link";

import { ImageCarousel } from "@/components/image-carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, IndianRupee, Send } from "lucide-react";

import { fetchPost } from "@/actions/post";
import type { IPost } from "@/actions/types";

export default async function PostDetails({
  params,
}: {
  params: { id: string };
}) {
  const post = (await fetchPost(params.id)) as IPost;

  return (
    <div className="h-full mb-20 lg:mb-0">
      <Link
        href={"/home"}
        className="text-primary hover:bg-secondary hover:text-white transition-all duration-150 w-fit rounded-full p-5 block"
      >
        <ArrowLeft size={28} />
      </Link>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg mx-auto px-14">
          <ImageCarousel images={post.images} />
        </div>
        <div className="w-full space-y-2 p-5">
          <h1 className="text-2xl font-bold text-secondary">{post.title}</h1>
          <p className="text-neutral-800 text-wrap text-sm">
            {post.description}
          </p>
          <p className="flex items-center font-extrabold text-2xl text-primary">
            <IndianRupee /> {post.price}
          </p>

          <Button className="w-full bg-primary text-white hover:bg-accent">
            <Send className="mr-2" /> Message seller
          </Button>
        </div>
      </div>

      {/* <div></div> */}
    </div>
  );
}
