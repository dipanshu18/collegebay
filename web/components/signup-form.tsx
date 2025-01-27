"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CldUploadButton,
  type CloudinaryUploadWidgetInfo,
} from "next-cloudinary";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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

  const [otp, setOtp] = useState<string | undefined>();

  async function handleSignup(values: z.infer<typeof SignupSchema>) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/signup`, values, {
        withCredentials: true,
      });

      if (response.status === 201) {
        const data = response.data.msg;
        toast.success(data);
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
    <form onSubmit={form.handleSubmit(handleSignup)}>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-2xl text-primary font-bold">Create your account</h1>
        <p className="text-accent  text-balance text-sm text-muted-foreground">
          Enter your details below to create your account
        </p>
      </div>

      <div className="grid gap-3 mt-5">
        {/* <div className="flex flex-col items-center gap-2 p-4">
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
        </div> */}

        <div className="grid gap-2">
          <Label>Profile picture</Label>
          <CldUploadButton
            className="max-w-xs bg-primary hover:bg-accent rounded-md py-2 text-white text-sm font-medium"
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
        <div className="flex items-end gap-2 w-full">
          <div className="grid gap-2 w-full">
            <Label
              className={cn(form.formState.errors.email && "text-red-500")}
            >
              Email
            </Label>
            <Input
              type="email"
              placeholder="your edu email"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-base">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          {/* <div>
            <Button className="w-full flex items-center gap-2 mt-2 bg-accent hover:bg-primary">
              Send OTP
            </Button>
          </div> */}
        </div>
        {/* <div className="flex items-end gap-2">
          <div className="space-y-2">
            <Label className="text-primary">Enter OTP</Label>
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => setOtp(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div>
            <Button className="w-full flex items-center gap-2 mt-2 bg-accent hover:bg-primary">
              Verify
            </Button>
          </div>
        </div> */}
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
        <div className="grid gap-2">
          <Label
            className={cn(form.formState.errors.phoneNo && "text-red-500")}
          >
            Phone No.{" "}
            <span className="text-accent text-sm">
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
            className={cn(form.formState.errors.college && "text-red-500")}
          >
            College
          </Label>

          <Select
            {...form.register("college")}
            defaultValue={form.formState.defaultValues?.college}
          >
            <SelectTrigger className="">
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
          className="w-full flex items-center gap-2 mt-2 bg-primary hover:bg-accent"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Signup"}
        </Button>
      </div>

      <div className="text-center text-sm mt-5">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-primary hover:text-info transition-all duration-300 underline underline-offset-4"
        >
          Login
        </Link>
      </div>
    </form>
  );
}
