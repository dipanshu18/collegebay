"use client";

import { UpdatePostSchema } from "@/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { IPost } from "@/api/types";

export default function EditProductListingForm({ post }: { post: IPost }) {
  // Initialize state with existing images and new image files
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    post.images // Array of CloudFront URLs
  );

  const form = useForm<z.infer<typeof UpdatePostSchema>>({
    resolver: zodResolver(UpdatePostSchema),
    mode: "onChange",
    defaultValues: {
      title: post.title,
      description: post.description,
      price: post.price,
    },
  });

  // Handle file change event
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages((prevImages) => [...prevImages, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  // Handle image removal
  const handleImageRemove = (index: number) => {
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  async function updatePost(values: z.infer<typeof UpdatePostSchema>) {
    const formData = new FormData();

    if (values.title) formData.append("title", values.title);
    if (values.description) formData.append("description", values.description);
    if (values.price) formData.append("price", values.price);

    // Append images to FormData
    images.forEach((file) => {
      formData.append("images", file);
    });

    console.log(values);
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(updatePost)}>
        <FormField
          name="images"
          control={form.control}
          render={() => {
            return (
              <FormItem>
                <FormLabel
                  className={cn(
                    form.formState.errors.images && "dark:text-red-400"
                  )}
                >
                  Images
                </FormLabel>
                <FormDescription>
                  Select up to 4 images of your product
                </FormDescription>
                <FormControl>
                  <Input
                    className="dark:bg-inherit"
                    type="file"
                    multiple
                    accept="image/jpeg"
                    onChange={handleImageChange}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
                <div className="flex mt-4 flex-wrap gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative w-32 h-32">
                      <Image
                        src={"https://dzgbuobd25m4d.cloudfront.net/" + preview}
                        alt={`Image ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-0 right-0 text-white bg-red-500 w-5 h-5 flex items-center justify-center rounded-full"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </FormItem>
            );
          }}
        />

        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  form.formState.errors.title && "dark:text-red-400"
                )}
              >
                Title
              </FormLabel>
              <FormControl>
                <Input className="dark:bg-inherit" type="text" {...field} />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  form.formState.errors.description && "dark:text-red-400"
                )}
              >
                Description
              </FormLabel>
              <FormControl>
                <Textarea className="dark:bg-inherit" {...field} />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  form.formState.errors.price && "dark:text-red-400"
                )}
              >
                Price
              </FormLabel>
              <FormControl>
                <Input className="dark:bg-inherit" type="text" {...field} />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />

        <Button className="w-full">Save Changes</Button>
      </form>
    </Form>
  );
}
