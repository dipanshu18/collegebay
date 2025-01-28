"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Plus, Upload } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/components/lib/utils";
import type { UserProfile } from "@/types/index";
import { UpdateProfileSchema } from "@/types/zodSchema";
import { updateProfile } from "@/actions/user";
import {
  CldUploadButton,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";

export function UpdateProfileForm({ user }: { user: UserProfile | undefined }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    mode: "onChange",
    defaultValues: {
      ...user,
    },
  });

  async function handleUpdateProfile(
    values: z.infer<typeof UpdateProfileSchema>
  ) {
    const modifiedData: Partial<z.infer<typeof UpdateProfileSchema>> = {};

    if (values.image) modifiedData.image = values.image;
    if (values.name) modifiedData.name = values.name;
    if (values.phoneNo) modifiedData.phoneNo = values.phoneNo;
    if (values.password) modifiedData.password = values.password;

    const response = await updateProfile(modifiedData);

    if (response?.error) return toast.error(response.error);

    if (response?.success) {
      toast.success(response.success);
      router.replace("/profile");
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateProfile)}
      className="space-y-5 max-w-xl"
    >
      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label>Update profile picture</Label>
          <CldUploadButton
            className="w-full bg-primary hover:bg-accent rounded-md py-2 text-white"
            onSuccess={(results) => {
              const imageObj = results.info as CloudinaryUploadWidgetInfo;
              const url = imageObj.secure_url;
              form.setValue("image", url);
            }}
            options={{
              cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
              apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
              sources: ["camera", "local"],
              maxFiles: 1,
              maxImageFileSize: 5000000,
              clientAllowedFormats: ["jpeg", "png"],
            }}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
          />
        </div>

        <div className="grid gap-2">
          <Label className={cn(form.formState.errors.name && "text-red-500")}>
            Full Name
          </Label>
          <Input
            type="text"
            placeholder="your full name"
            {...form.register("name")}
          />
          {form.formState.errors.name && (
            <p className="text-red-500 text-base">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label
            className={cn(form.formState.errors.phoneNo && "text-red-500")}
          >
            Phone No.{" "}
            <span className="text-sm">
              (Please don{`'`}t include +91- or +91)
            </span>
          </Label>
          <Input
            type="text"
            placeholder="your phone no."
            {...form.register("phoneNo")}
          />
          {form.formState.errors.phoneNo && (
            <p className="text-red-500 text-base">
              {form.formState.errors.phoneNo.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label
            className={cn(form.formState.errors.password && "text-red-500")}
          >
            Password
          </Label>
          <Input
            type="password"
            placeholder="your password"
            {...form.register("password")}
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-base">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {form.formState.isDirty && (
          <Button
            disabled={form.formState.isSubmitting}
            className="w-full bg-primary hover:bg-accent text-white"
            type="submit"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Save Changes"}
          </Button>
        )}
      </div>
    </form>
  );
}
