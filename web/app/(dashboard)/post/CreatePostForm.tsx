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
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostSchema } from "@/types/zodSchema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef, useState } from "react";
import { XIcon } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Spinner from "@/components/Spinner";

export default function CreatePostForm() {
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

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const updatedPreviews = [...imagePreviews];
      const selectedFiles = Array.from(files);

      selectedFiles.slice(0, 4 - imagePreviews.length).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          updatedPreviews.push(reader.result as string);
          setImagePreviews(updatedPreviews);
          form.setValue("images", [...form.getValues("images"), file]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    const updatedFiles = form.getValues("images").filter((_, i) => i !== index);

    setImagePreviews(updatedPreviews);
    form.setValue("images", updatedFiles);
  };

  async function createPost(values: z.infer<typeof CreatePostSchema>) {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    if (values.images.length > 0) {
      values.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/posts",
        formData,
        { withCredentials: true }
      );

      if (response.status === 201) {
        const data = await response.data.msg;
        toast.success(data);

        form.reset();
        setImagePreviews([]);

        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }

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
          render={() => {
            return (
              <FormItem>
                <FormLabel
                  htmlFor="image"
                  className={cn(
                    form.formState.errors.images && "dark:text-red-400"
                  )}
                >
                  Images
                </FormLabel>
                <FormDescription>
                  Select up to 4 images for your product
                </FormDescription>

                <div className="grid grid-cols-2 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={preview}
                        alt={`Selected Image ${index + 1}`}
                        width={100}
                        height={100}
                        quality={100}
                        className="object-cover w-full h-24"
                      />
                      <button
                        type="button"
                        className="absolute top-0 left-0 bg-black text-white p-1 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <XIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {imagePreviews.length < 4 && (
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/jpeg"
                      multiple
                      maxLength={4}
                      className="w-full dark:bg-inherit mt-4"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />
                  </FormControl>
                )}

                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />

        <Button
          disabled={form.formState.isSubmitting}
          className="w-full flex gap-2"
        >
          {form.formState.isSubmitting && <Spinner />} Create Listing
        </Button>
      </form>
    </Form>
  );
}
