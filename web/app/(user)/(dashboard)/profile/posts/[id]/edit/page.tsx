import { fetchPost } from "@/actions/post";
import { IPost } from "@/actions/types";
import { EditProductListingForm } from "@/components/edit-listing-form";
import { toast } from "sonner";

export default async function EditPost({ params }: { params: { id: string } }) {
  const response = await fetchPost(params.id);
  let post: IPost | undefined = undefined;

  if (response?.error) return toast.error(response.error);

  if (response?.success) {
    post = response.success;
  }

  return (
    <div className="p-5">
      <h1 className="mb-5 text-xl font-bold text-primary">Edit post</h1>

      <div className="p-10 shadow rounded-md bg-gray-50">
        <EditProductListingForm post={post as IPost} />
      </div>
    </div>
  );
}
