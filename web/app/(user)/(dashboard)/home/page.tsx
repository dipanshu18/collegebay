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
import { fetchPosts } from "@/actions/post";
import type { IPost } from "@/actions/types";
import { PostCard } from "@/components/post-card";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const posts = (await fetchPosts()) as IPost[];

  return (
    <div className="p-5 space-y-3 mb-20 lg:mb-0 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold text-primary">Browse Resources</h1>
      <Filters />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <>
              <PostCard type="home" key={post.id} post={post} />
            </>
          ))
        ) : (
          <h1 className="col-span-3 text-xl">No resource listed yet</h1>
        )}
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
