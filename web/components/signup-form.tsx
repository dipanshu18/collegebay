"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

import { cn } from "@/components/lib/utils";
import { SignupSchema } from "@/types/zodSchema";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:5000/api/v1";

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

  async function handleSigup(values: z.infer<typeof SignupSchema>) {
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("name", values.name);
      formData.append("password", values.password);
      formData.append("college", values.college);
      formData.append("phoneNo", values.phoneNo);
      if (values.image) {
        formData.append("image", values.image);
      }

      const response = await axios.post(`${BASE_URL}/auth/signup`, formData, {
        withCredentials: true,
      });

      if (response.status === 201) {
        const data = response.data;
        toast(data.msg);
        return router.replace("/home");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = error.response?.data.msg;
        console.log(errorData);
        if (errorData) {
          if (typeof errorData === "object") {
            // biome-ignore lint/complexity/noForEach: <explanation>
            Object.entries(errorData).forEach(async ([field, message]) => {
              toast.error(`${field}: ${message}`);
            });
          } else {
            return toast.error(errorData);
          }
        }
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(handleSigup)}>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl text-primary font-bold">Create your account</h1>
        <p className="text-accent text-balance text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>

      <div className="grid gap-3">
        <div className="flex flex-col items-center gap-2 p-4">
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
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full flex items-center gap-2 mt-2 bg-accent hover:bg-primary"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Signup"}
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
