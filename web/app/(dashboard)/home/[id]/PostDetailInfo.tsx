"use client";

import ImageCarousel from "@/components/ImageCarousel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Post } from "../PostPage";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function PostDetailInfo({ id }: { id: string }) {
  const [post, setPost] = useState<Post>();

  async function fetchPost() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/v1/posts/${id}`,
        { withCredentials: true }
      );

      if (response.status === 200) {
        const data = await response.data.post;
        setPost(data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = await error.response?.data.msg;
        toast.error(errorData);
      }
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="my-5 p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10 place-items-center space-y-10 md:space-y-0 md:space-x-10">
        <div className="w-full my-5 md:col-span-2">
          <ImageCarousel images={post?.images!} />
        </div>
        <div className="space-y-3 w-full my-10 col-span-2 md:col-span-1">
          <h1 className="text-2xl font-bold">{post?.title}</h1>
          <p className="text-sm text-neutral-700 dark:text-neutral-200 text-wrap">
            {post?.description}
          </p>
          <p className="font-extrabold text-xl">Rs. {post?.price}</p>

          <div className="md:max-w-sm">
            <Button className="w-full">Message seller</Button>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}
