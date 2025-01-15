"use client";

import PostCard from "./PostCard";
import Spinner from "@/components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/api/queries";
import { IPost } from "@/api/types";

export default function PostPage() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full">
        <Spinner />
      </div>
    );
  }

  if (isError && !isLoading) {
    return <h1>Error while fetching posts...</h1>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 my-10">
      {posts && posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <h1 className="col-span-3 text-xl">No posts created yet 🙂</h1>
      )}
    </div>
  );
}
