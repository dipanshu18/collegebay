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
import { createPost } from "@/actions/user";
import { revalidatePath } from "next/cache";
import { Label } from "./ui/label";

export function CreatePostForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreatePostSchema>>({
    resolver: zodResolver(CreatePostSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      price: "",
      images: [],
    },
  });

  async function handleCreatePost(values: z.infer<typeof CreatePostSchema>) {
    const formData = new FormData();

    // biome-ignore lint/complexity/noForEach: <explanation>
    values.images.forEach((image) => {
      formData.append("images", image); // Append each file
    });
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);

    const response = await createPost(formData);

    if (response?.success) {
      form.reset();
      router.refresh();
    }
  }

  return (
    <form className="text-left" onSubmit={form.handleSubmit(handleCreatePost)}>
      <div className="grid gap-2">
        <div className="grid gap-2">
          <Label className={cn(form.formState.errors.images && "text-red-500")}>
            Product Images (Select upto 4 images)
          </Label>
          <Input
            type="file"
            accept="image/jpeg"
            multiple
            maxLength={4}
            className="w-full dark:bg-inherit mt-4"
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              form.setValue("images", files, { shouldValidate: true });
            }}
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
        <Button
          disabled={form.formState.isSubmitting}
          className="w-full flex gap-2"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Create post"}
        </Button>
      </div>
    </form>
  );
}
