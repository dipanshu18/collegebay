"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

import { toast } from "sonner";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CldUploadButton,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/components/lib/utils";
import type { IPost } from "@/actions/types";
import { UpdatePostSchema } from "@/types/zodSchema";
import { updatePost } from "@/actions/post";

export function EditProductListingForm({ post }: { post: IPost }) {
  const router = useRouter();
  const imgUrls = useRef<string[]>([]);

  const form = useForm<z.infer<typeof UpdatePostSchema>>({
    resolver: zodResolver(UpdatePostSchema),
    mode: "onChange",
    defaultValues: {
      ...post,
    },
  });

  async function handleUpdatePost(values: z.infer<typeof UpdatePostSchema>) {
    const modifiedData: Partial<z.infer<typeof UpdatePostSchema>> = {};

    if (values.images) modifiedData.images = values.images;
    if (values.title) modifiedData.title = values.title;
    if (values.description) modifiedData.description = values.description;
    if (values.price) modifiedData.price = values.price;
    if (values.category) modifiedData.category = values.category;

    const response = await updatePost(post.id, modifiedData);

    if (response?.error) {
      return toast.error(response.error);
    }

    if (response?.success) {
      toast.success(response.success);
      router.refresh();

      router.push(`/profile/posts/${post.id}`);
      return;
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleUpdatePost)}>
      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label className={cn(form.formState.errors.images && "text-red-500")}>
            Product Images (Select upto 4 images)
          </Label>
          <CldUploadButton
            className="w-full bg-primary hover:bg-accent rounded-md py-2 text-white font-medium text-sm"
            onSuccess={(results) => {
              const imageObj = results.info as CloudinaryUploadWidgetInfo;
              imgUrls.current.push(imageObj.secure_url);
              form.setValue("images", imgUrls.current, {
                shouldValidate: true,
              });
            }}
            options={{
              cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
              apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
              sources: ["camera", "local"],
              maxFiles: 4,
              maxImageFileSize: 5000000,
              clientAllowedFormats: ["jpeg", "png"],
            }}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
          />
          {form.formState.errors.images && (
            <p className="text-red-500">
              {form.formState.errors.images.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label className={cn(form.formState.errors.title && "text-red-500")}>
            Title
          </Label>
          <Input
            placeholder="resource title"
            type="text"
            {...form.register("title")}
          />
          {form.formState.errors.title && (
            <p className="text-red-500">
              {form.formState.errors.title.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label
            className={cn(form.formState.errors.description && "text-red-500")}
          >
            Description
          </Label>
          <Textarea
            placeholder="resource description"
            rows={7}
            {...form.register("description")}
          />
          {form.formState.errors.description && (
            <p className="text-red-500">
              {form.formState.errors.description.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label className={cn(form.formState.errors.price && "text-red-500")}>
            Price
          </Label>
          <Input
            placeholder="resource price"
            type="text"
            {...form.register("price")}
          />
          {form.formState.errors.price && (
            <p className="text-red-500">
              {form.formState.errors.price.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label
            className={cn(form.formState.errors.category && "text-red-500")}
          >
            Category
          </Label>

          <Select
            defaultValue={post.category}
            onValueChange={(value) => form.setValue("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="resource category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NOTES">Notes</SelectItem>
              <SelectItem value="BOOKS">Books</SelectItem>
              <SelectItem value="ELECTRONICS">Electronics</SelectItem>
              <SelectItem value="FURNITURE">Furniture</SelectItem>
              <SelectItem value="EQUIPMENT">Equipment</SelectItem>
            </SelectContent>
          </Select>

          {form.formState.errors.category && (
            <p className="text-red-500 text-base">
              {form.formState.errors.category.message}
            </p>
          )}
        </div>
        <Button
          disabled={form.formState.isSubmitting}
          className="w-full flex gap-2 bg-primary text-white hover:bg-accent mt-5"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
