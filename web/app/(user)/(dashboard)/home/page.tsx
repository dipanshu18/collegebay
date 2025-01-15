import type { Metadata } from "next";

import PostPage from "./PostPage";
import { Filters } from "@/components/filters";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <>
      <h1 className="text-xl font-bold">Browse Resources</h1>
      <Filters />
      <PostPage />
    </>
  );
}
