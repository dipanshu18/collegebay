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
} from "./ui/form";
import { z } from "zod";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

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

  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

  async function createRequest(values: z.infer<typeof CreateRequestSchema>) {
    try {
      const formData = new FormData();

      formData.append("title", values.title);
      formData.append("description", values.description);
      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/requests/create",
        formData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        const data = await response.data.msg;
        toast.success(data);

        form.reset();
        setImagePreview(null);
        router.refresh();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data.msg;
        if (errorData) {
          if (typeof errorData === "object") {
            Object.entries(errorData).forEach(async ([field, message]) => {
              toast.error(`${field}: ${message}`);
            });
          }
        }
      }
    }
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
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />

        <Button disabled={form.formState.isSubmitting} className="w-full">
          Create Request
        </Button>
      </form>
    </Form>
  );
}
