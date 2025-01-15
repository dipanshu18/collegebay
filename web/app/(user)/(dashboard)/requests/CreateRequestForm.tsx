"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { cn } from "@/components/lib/utils";
import { createRequest } from "@/api/mutations";
import { CreateRequestSchema } from "@/types/zodSchema";
import { Label } from "@/components/ui/label";
import { revalidatePath } from "next/cache";

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
      revalidatePath("/requests", "page");
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
    <form
      onSubmit={form.handleSubmit((values) =>
        createRequestMutation.mutate(values)
      )}
      className="space-y-4 mt-5"
    >
      <div className="grid gap-2">
        <Label
          htmlFor="image"
          className={cn(form.formState.errors.image && "text-red-500")}
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
        </Label>
        <Input
          id="image"
          className="w-full dark:bg-inherit"
          type="file"
          accept="image/jpeg"
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </div>

      <div className="grid gap-2">
        <Label
          htmlFor="title"
          className={cn(form.formState.errors.description && "text-red-500")}
        >
          Title
        </Label>
        <Input
          className="w-full"
          type="text"
          placeholder="your request resource title"
          {...form.register("title")}
        />
        {form.formState.errors.title && (
          <p className="text-red-500">{form.formState.errors.title.message}</p>
        )}
      </div>
      <div className="grid gap-2">
        <Label
          htmlFor="description"
          className={cn(form.formState.errors.description && "text-red-500")}
        >
          Description
        </Label>
        <Textarea
          className="w-full"
          rows={10}
          placeholder="your request resource description"
          {...form.register("description")}
        />
        {form.formState.errors.description && (
          <p className="text-red-500">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <Button
        disabled={createRequestMutation.isPending}
        className="w-full flex gap-2"
      >
        {createRequestMutation.isPending ? "Submitting..." : "Create request"}
      </Button>
    </form>
  );
}
