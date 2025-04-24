import { CreatePostForm } from "@/components/create-post-form";

export default function PostResource() {
  return (
    <div className="p-5 mb-10 lg:mb-0">
      <h1 className="text-xl font-bold text-primary">Post a resource</h1>

      <div className="my-5 p-10 bg-gray-50 shadow rounded-md max-w-2xl">
        <CreatePostForm />
      </div>
    </div>
  );
}
