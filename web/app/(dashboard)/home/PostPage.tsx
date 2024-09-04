"use client";

import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import Spinner from "@/components/Spinner";

export interface Post {
  id: string;
  title: string;
  description: string;
  price: string;
  images: string[];
  isAvailable: boolean;
  isApproved: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function PostPage() {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [loading, setLoading] = useState(false);

  async function fetchPosts() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/v1/posts", {
        withCredentials: true,
      });

      if (response.status === 200) {
        const data = await response.data.posts;
        setPosts(data);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.msg);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5 my-10">
      {posts.length > 0 ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <h1 className="col-span-3 text-xl">No posts created yet 🙂</h1>
      )}
    </div>
  );
}
