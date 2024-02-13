import { PostsCard } from "@repo/ui/postscard";

export default function UserDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-10">Posts</h1>

      <div className="flex gap-10 flex-wrap items-center justify-center m-10">
        <PostsCard type="other" />
        <PostsCard type="other" />
        <PostsCard type="other" />
        <PostsCard type="other" />
        <PostsCard type="other" />
      </div>
    </div>
  );
}
