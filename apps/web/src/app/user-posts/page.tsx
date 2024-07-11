import { PostsCard } from "@repo/ui/postscard";

export default function UserPosts() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-10">
        Your Posted Items
      </h1>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 p-5">
        <PostsCard type="self" />
        <PostsCard type="self" />
        <PostsCard type="self" />
        <PostsCard type="self" />
        <PostsCard type="self" />
      </div>
    </div>
  );
}
