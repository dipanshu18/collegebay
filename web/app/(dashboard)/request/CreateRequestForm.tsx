"use client";

import { CreateRequestSchema } from "@/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Image from "next/image";
import Spinner from "@/components/Spinner";
import { useMutation } from "@tanstack/react-query";
import { createRequest } from "@/api/mutations";

export default function CreateRequestForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateRequestSchema>>({
    resolver: zodResolver(CreateRequestSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const createRequestMutation = useMutation({
    mutationKey: ["createRequest"],
    mutationFn: createRequest,
    onSuccess: () => {
      form.reset();
      setImagePreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      router.refresh();
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          createRequestMutation.mutate(values)
        )}
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
                  htmlFor="image"
                  className={cn(
                    form.formState.errors.image && "dark:text-red-400"
                  )}
                >
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Selected Image"
                      width={100}
                      height={100}
                      quality={100}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "Image"
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    id="image"
                    className="w-full dark:bg-inherit"
                    type="file"
                    accept="image/jpeg"
                    onChange={(e) => {
                      field.onChange(e.target.files && e.target.files[0]);
                      handleImageChange(e);
                    }}
                    ref={fileInputRef}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />

        <Button
          disabled={createRequestMutation.isPending}
          className="w-full flex gap-2"
        >
          {createRequestMutation.isPending && <Spinner />} Create Request
        </Button>
      </form>
    </Form>
  );
}
