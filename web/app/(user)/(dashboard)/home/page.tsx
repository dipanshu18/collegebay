import type { Metadata } from "next";

import PostPage from "./PostPage";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="my-5">
      <PostPage />
    </div>
  );
}
