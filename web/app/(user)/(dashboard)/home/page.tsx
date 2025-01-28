import type { Metadata } from "next";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Filters } from "@/components/filters";
import { fetchFilteredPosts, fetchPosts } from "@/actions/post";
import type { IPost } from "@/actions/types";
import { PostCard } from "@/components/post-card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  let query: string | undefined = undefined;
  let category: string | undefined = undefined;

  if (searchParams) {
    query = searchParams?.q;
    category = searchParams.category;
  }

  console.log(query, category);

  const response =
    query !== undefined || category !== undefined
      ? await fetchFilteredPosts(category as string, query)
      : await fetchPosts();

  let posts: IPost[] | [] = [];
  if ((query !== undefined || category !== undefined) && response?.error) {
    return (
      <div className="p-5">
        <Link href={"/home"}>
          <div className="text-primary flex items-center justify-center  w-10 h-10 rounded-full hover:bg-primary hover:text-white transition duration-150">
            <ArrowLeft size={24} />
          </div>
        </Link>
        <h1 className="text-xl font-bold">Search Results: </h1>
        <h1>{response.error}</h1>
      </div>
    );
  }

  if (response?.success) {
    posts = response.success;
  }

  return (
    <div className="p-5 mb-20 lg:mb-0 flex flex-col justify-between h-full">
      <div>
        <h1 className="text-xl font-bold text-primary mb-5">
          Browse Resources
        </h1>
        <Filters />

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <>
                <PostCard type="home" key={post.id} post={post} />
              </>
            ))
          ) : (
            <h1 className="col-span-3 text-xl font-bold">
              No resource listed yet
            </h1>
          )}
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
