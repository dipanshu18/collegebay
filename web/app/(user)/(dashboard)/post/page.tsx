import { CreatePostForm } from "@/components/create-post-form";

export default function PostResource() {
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold text-primary">Post a resource</h1>

      <div className="my-5 p-5 shadow rounded-md bg-gray-100 max-w-xl">
        <CreatePostForm />
      </div>
    </div>
  );
}
