import { fetchPost } from "@/actions/user";
import { ImageCarousel } from "@/components/image-carousel";
import { Button } from "@/components/ui/button";

import type { IPost } from "@/actions/types";

export default async function PostDetails({
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

          <Button className="w-full md:max-w-sm">Message seller</Button>
        </div>
      </div>

      {/* <div></div> */}
    </div>
  );
}
