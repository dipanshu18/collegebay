import { CreatePostForm } from "@/components/create-post-form";

export default function PostResource() {
  return (
    <>
      <h1 className="pl-4 text-xl font-bold">Post a resource</h1>

      <div className="p-4">
        <CreatePostForm />
      </div>
    </>
  );
}
