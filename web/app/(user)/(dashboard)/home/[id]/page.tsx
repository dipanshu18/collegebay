import Link from "next/link";

import { ImageCarousel } from "@/components/image-carousel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, IndianRupee, Send } from "lucide-react";

import { fetchPost } from "@/actions/post";
import type { IPost } from "@/actions/types";
import { toast } from "sonner";
import Image from "next/image";

export default async function PostDetails({
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

  console.log(post);

  return (
    <div className="h-full mb-20 lg:mb-0">
      <div className="pt-5 pl-5">
        <Link
          href={"/home"}
          className="text-primary hover:bg-secondary hover:text-white transition-all duration-150 w-10 h-10 flex justify-center items-center rounded-full"
        >
          <ArrowLeft size={24} />
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg mx-auto px-14">
          <ImageCarousel images={post?.images as string[]} />
        </div>
        <div className="w-full space-y-2 px-5">
          <h1 className="text-2xl font-bold text-secondary">{post?.title}</h1>
          <p className="text-neutral-800 text-wrap text-sm">
            {post?.description}
          </p>
          <p className="flex items-center font-extrabold text-2xl text-primary">
            <IndianRupee /> {post?.price}
          </p>
          <div>
            <h1 className="text-lg font-semibold text-secondary">Sold by:</h1>
            <div className="flex items-center gap-2">
              <Image
                src={post?.user.image as string}
                alt={`${post?.user.name} profile picture`}
                width={100}
                height={100}
                quality={100}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h1 className="text-lg font-semibold text-secondary">
                  {post?.user.name}
                </h1>
                <h2 className="text-lg font-semibold text-secondary">
                  {post?.user.college}
                </h2>
              </div>
            </div>
          </div>

          <Button className="w-full bg-primary text-white hover:bg-accent">
            <Send className="mr-2" /> Message seller
          </Button>
        </div>
      </div>

      {/* <div></div> */}
    </div>
  );
}
