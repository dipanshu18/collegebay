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
import { revalidatePath } from "next/cache";

export function UpdateProfileForm({ user }: { user: UserProfile | undefined }) {
  const router = useRouter();

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    mode: "onChange",
    defaultValues: {
      ...user,
      image: user?.image,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    user ? `https://dzgbuobd25m4d.cloudfront.net/${user.image}` : null
  );

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

  async function handleUpdateProfile(
    values: z.infer<typeof UpdateProfileSchema>
  ) {
    const modifiedData = Object.keys(form.formState.dirtyFields).reduce(
      (acc, key) => {
        const typedKey = key as keyof z.infer<typeof UpdateProfileSchema>;

        if (form.formState.dirtyFields[typedKey]) {
          if (typedKey === "image") {
            const imageValue = values.image;
            if (imageValue instanceof File) {
              acc[typedKey] = imageValue; // Keep File if new image is uploaded
            } else if (typeof imageValue === "string") {
              acc[typedKey] = imageValue; // Keep string if it's unchanged
            }
          } else {
            acc[typedKey] = values[typedKey];
          }
        }
        return acc;
      },
      {} as Partial<z.infer<typeof UpdateProfileSchema>>
    );

    if (Object.keys(modifiedData).length === 0) {
      return toast.error("Nothing to update");
    }

    // If image is present, handle FormData
    const payload: Partial<z.infer<typeof UpdateProfileSchema>> = modifiedData;

    const response = await updateProfile(payload);

    if (response?.error) return toast(response.error);

    if (response?.success) {
      toast(response.success);
      router.refresh();
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handleUpdateProfile)}
      className="space-y-5"
    >
      <div className="grid gap-3">
        <div className="flex flex-col items-center gap-4 p-4">
          <div className="relative">
            <div
              className={cn(
                "h-32 w-32 rounded-full overflow-hidden bg-muted flex items-center justify-center hover:opacity-90 transition-opacity",
                !imagePreview &&
                  "border-2 border-dashed border-muted-foreground"
              )}
            >
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Selected image"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Upload className="h-12 w-12 text-muted-foreground" />
              )}
            </div>
            <Button
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("image-input")?.click();
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <input
            id="image-input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="grid gap-2">
          <Label className={cn(form.formState.errors.name && "text-red-500")}>
            Full Name
          </Label>
          <Input
            type="text"
            placeholder="your full name"
            className="py-6"
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
            className="py-6"
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
            className="py-6"
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
            className="w-full"
            type="submit"
          >
            {form.formState.isSubmitting ? "Submitting..." : "Save Changes"}
          </Button>
        )}
      </div>
    </form>
  );
}
