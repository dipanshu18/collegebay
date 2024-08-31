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
} from "./ui/form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export default function EditProductListingForm() {
  const form = useForm<z.infer<typeof UpdatePostSchema>>({
    resolver: zodResolver(UpdatePostSchema),
    mode: "onChange",
    defaultValues: {},
  });

  async function updatePost(values: z.infer<typeof UpdatePostSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(updatePost)}>
        <FormField
          name="images"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel
                  className={cn(
                    form.formState.errors.title && "dark:text-red-400"
                  )}
                >
                  Image
                </FormLabel>
                <FormDescription>
                  Select upto 4 images of your product
                </FormDescription>
                <FormControl>
                  <Input
                    className="dark:bg-inherit"
                    type="file"
                    multiple
                    minLength={4}
                    accept="image/jpeg"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />
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
                  <Input className="dark:bg-inherit" type="text" {...field} />
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
                    form.formState.errors.title && "dark:text-red-400"
                  )}
                >
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea className="dark:bg-inherit" {...field} />
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
                    form.formState.errors.title && "dark:text-red-400"
                  )}
                >
                  Price
                </FormLabel>
                <FormControl>
                  <Input className="dark:bg-inherit" type="text" {...field} />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />
        <Button className="w-full">Save Changes</Button>
      </form>
    </Form>
  );
}
