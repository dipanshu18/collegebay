"use client";

import { fetchPost } from "@/api/queries";
import { IPost } from "@/api/types";
import ImageCarousel from "@/components/ImageCarousel";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function PostDetailInfo({ id }: { id: string }) {
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<IPost>({
    queryKey: ["postDetails", id],
    queryFn: () => fetchPost(id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full">
        <Spinner />
      </div>
    );
  }

  if (isError && !isLoading) {
    return <h1>Error while fetching post details...</h1>;
  }

  return (
    <div className="my-5 p-5">
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-10 place-items-center space-y-10 md:space-y-0 md:space-x-10">
        <div className="w-full my-5 md:col-span-2">
          <ImageCarousel images={post?.images!} />
        </div>
        <div className="space-y-3 w-full my-10 col-span-2 md:col-span-2">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            {post?.title}
          </h1>
          <p className="text-lg text-neutral-700 dark:text-neutral-200 text-wrap">
            {post?.description}
          </p>
          <p className="font-extrabold text-2xl">Rs. {post?.price}</p>

          <div className="mr-5">
            <Button className="w-full">Message seller</Button>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}
