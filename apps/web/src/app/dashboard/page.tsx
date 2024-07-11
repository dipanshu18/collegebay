import { PostsCard } from "@repo/ui/postscard";

export default function UserDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-10">Posts</h1>

      <div className="mx-auto grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 place-items-center gap-5">
        <PostsCard type="other" />
        <PostsCard type="other" />
        <PostsCard type="other" />
        <PostsCard type="other" />
        <PostsCard type="other" />
      </div>
    </div>
  );
}
