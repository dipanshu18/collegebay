"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostSchema } from "@/types/zodSchema";
import { z } from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function CreatePostForm() {
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

  async function createPost(values: z.infer<typeof CreatePostSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(createPost)}
        className="text-left max-w-lg w-full mx-auto border shadow p-5 rounded-md space-y-4 mt-5"
      >
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel
                  className={cn(
                    form.formState.errors.title && "dark:text-red-400"
                  )}
                >
                  Title
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="your product title"
                    className="w-full dark:bg-inherit"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel
                  className={cn(
                    form.formState.errors.description && "dark:text-red-400"
                  )}
                >
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="your product description"
                    className="w-full dark:bg-inherit"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />

        <FormField
          name="price"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel
                  className={cn(
                    form.formState.errors.price && "dark:text-red-400"
                  )}
                >
                  Price
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="your product resale price"
                    className="w-full dark:bg-inherit"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />

        <FormField
          name="images"
          control={form.control}
          render={({ field }) => {
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
                  Select upto 4 images for your product
                </FormDescription>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/jpeg"
                    multiple
                    maxLength={4}
                    className="w-full dark:bg-inherit"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />

        <Button className="w-full">Create Listing</Button>
      </form>
    </Form>
  );
}
