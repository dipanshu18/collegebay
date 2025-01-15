"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { SignupSchema } from "@/types/zodSchema";
import { signup } from "@/api/mutations";

export function SignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      college: "Vidyalankar Institute of Technology, Mumbai",
      phoneNo: "",
    },
  });

  const signupMutation = useMutation({
    mutationKey: ["signupUser"],
    mutationFn: signup,
    onSuccess: () => {
      router.replace("/home");
      router.refresh();
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

  return (
    <form
      onSubmit={form.handleSubmit((values) => signupMutation.mutate(values))}
      className="space-y-2"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl text-primary font-bold">Create your account</h1>
        <p className="text-accent text-balance text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>

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
                <Upload className="h-12 w-12 text-muted-foreground text-accent" />
              )}
            </div>
            <Button
              size="icon"
              className="bg-accent hover:bg-primary absolute bottom-0 right-0 rounded-full h-8 w-8"
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
          <Label className="text-sm text-accent">
            Click <span className="mx-1 font-bold">+</span> to upload
          </Label>
        </div>

        <div className="grid gap-2">
          <Label
            className={cn(
              "text-primary",
              form.formState.errors.name && "text-red-500"
            )}
          >
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
            className={cn(
              "text-primary",
              form.formState.errors.email && "text-red-500"
            )}
          >
            Email
          </Label>
          <Input
            type="email"
            placeholder="your edu email"
            className="py-6"
            {...form.register("email")}
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-base">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label
            className={cn(
              "text-primary",
              form.formState.errors.password && "text-red-500"
            )}
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
        <div className="grid gap-2">
          <Label
            className={cn(
              "text-primary",
              form.formState.errors.phoneNo && "text-red-500"
            )}
          >
            Phone No.{" "}
            <span className="text-info text-sm">
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
            className={cn(
              "text-primary",
              form.formState.errors.college && "text-red-500"
            )}
          >
            College
          </Label>

          <Select
            {...form.register("college")}
            defaultValue={form.formState.defaultValues?.college}
          >
            <SelectTrigger className="py-6">
              <SelectValue placeholder="your college" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Vidyalankar Institute of Technology, Mumbai">
                Vidyalankar Institute of Technology, Mumbai
              </SelectItem>
            </SelectContent>
          </Select>

          {form.formState.errors.college && (
            <p className="text-red-500 text-base">
              {form.formState.errors.college.message}
            </p>
          )}
        </div>
        <Button
          disabled={signupMutation.isPending}
          type="submit"
          className="w-full flex items-center gap-2 mt-2 bg-accent hover:bg-primary"
        >
          {signupMutation.isPending ? "Submitting..." : "Signup"}
        </Button>
      </div>

      <div className="text-accent text-center text-sm mt-5">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-info transition-all duration-300 underline underline-offset-4"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
