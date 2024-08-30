"use client";

import { CreateRequestSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function CreateRequestForm() {
  const form = useForm<z.infer<typeof CreateRequestSchema>>({
    resolver: zodResolver(CreateRequestSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  async function createRequest(values: z.infer<typeof CreateRequestSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(createRequest)}
        className="text-left space-y-4 mt-5 max-w-lg mx-auto border rounded-md p-5 shadow"
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
                    className="w-full dark:bg-inherit"
                    type="text"
                    placeholder="your request product title"
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
                    className="w-full dark:bg-inherit"
                    placeholder="your request product description"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />

        <FormField
          name="image"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel
                  className={cn(
                    form.formState.errors.image && "dark:text-red-400"
                  )}
                >
                  Image
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full dark:bg-inherit"
                    type="file"
                    accept="image/*"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />

        <Button className="w-full">Create Request</Button>
      </form>
    </Form>
  );
}
