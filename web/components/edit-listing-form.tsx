"use client";

import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { cn } from "@/components/lib/utils";
import type { IPost } from "@/actions/types";
import { UpdatePostSchema } from "@/types/zodSchema";

export function EditProductListingForm({ post }: { post: IPost }) {
  const form = useForm<z.infer<typeof UpdatePostSchema>>({
    resolver: zodResolver(UpdatePostSchema),
    mode: "onChange",
    defaultValues: {
      title: post.title,
      description: post.description,
      price: post.price,
    },
  });

  // async function handleUpdatePost(values: z.infer<typeof UpdatePostSchema>) {
  //   const response  = await update
  // }

  return (
    <form className="space-y-4">
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
            {...form.register("images")}
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
        <Button
          disabled={form.formState.isSubmitting}
          className="w-full flex gap-2"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
