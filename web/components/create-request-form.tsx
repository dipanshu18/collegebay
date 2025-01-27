"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
  CldUploadButton,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { cn } from "@/components/lib/utils";
import { createRequest } from "@/actions/user";
import { CreateRequestSchema } from "@/types/zodSchema";

export function CreateRequestForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateRequestSchema>>({
    resolver: zodResolver(CreateRequestSchema),
    mode: "onChange",
  });

  async function handleCreateRequest(
    values: z.infer<typeof CreateRequestSchema>
  ) {
    const response = await createRequest(values);

    if (response?.success) {
      form.reset();

      router.refresh();
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleCreateRequest)}
      className="text-left space-y-4"
    >
      <div className="grid gap-2">
        <Label
          htmlFor="image"
          className={cn(form.formState.errors.image && "text-red-500")}
        >
          Upload reference image
        </Label>
        <CldUploadButton
          className="w-full bg-primary hover:bg-accent rounded-md py-2 text-white font-medium text-sm"
          onSuccess={(results) => {
            const imageObj = results.info as CloudinaryUploadWidgetInfo;

            form.setValue("image", imageObj.secure_url, {
              shouldValidate: true,
            });
          }}
          options={{
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
            sources: ["camera", "local"],
            maxFiles: 1,
          }}
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
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
        disabled={form.formState.isSubmitting}
        className="w-full flex gap-2 bg-primary hover:bg-accent rounded-md py-2 text-white"
      >
        {form.formState.isSubmitting ? "Submitting..." : "Create request"}
      </Button>
    </form>
  );
}
