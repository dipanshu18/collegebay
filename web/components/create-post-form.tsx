"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { cn } from "@/components/lib/utils";
import { CreatePostSchema } from "@/types/zodSchema";
import { createPost } from "@/actions/post";
import { Label } from "./ui/label";
import {
  CldUploadButton,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRef } from "react";
import { toast } from "sonner";

export function CreatePostForm() {
  const router = useRouter();

  const imgUrls = useRef<string[]>([]);
  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    mode: "onChange",
  });

  async function handleCreatePost(values: z.infer<typeof CreatePostSchema>) {
    const response = await createPost(values);

    if (response?.success) {
      toast.success(response.success);
      form.reset();
      form.resetField("category");
      router.refresh();
    }
  }

  return (
    <form className="text-left" onSubmit={form.handleSubmit(handleCreatePost)}>
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label className={cn(form.formState.errors.images && "text-red-500")}>
            Product Images (Select upto 4 images)
          </Label>
          <CldUploadButton
            className="w-full bg-primary hover:bg-accent rounded-md py-2 text-white"
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
            rows={10}
            placeholder="resource description"
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

          <Select onValueChange={(value) => form.setValue("category", value)}>
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
          className="w-full flex gap-2 bg-primary hover:bg-accent text-white"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Create post"}
        </Button>
      </div>
    </form>
  );
}
