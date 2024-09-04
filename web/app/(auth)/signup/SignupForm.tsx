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
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignupSchema } from "@/types/zodSchema";
import Spinner from "@/components/Spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function SignupForm() {
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

  async function signup(values: z.infer<typeof SignupSchema>) {
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

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const data = response.data;
        toast.success(data.msg);
        router.replace("/home");
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
          } else {
            toast.error(errorData);
          }
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(signup)}
        className="md:w-full md:max-w-xl max-w-md md:mx-auto space-y-4 my-5 p-5 border rounded-md shadow"
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex flex-wrap justify-center flex-col md:flex-nowrap items-center whitespace-nowrap gap-5">
              <FormLabel
                htmlFor="image"
                className={cn(
                  "flex items-center justify-center h-32 w-32 flex-shrink-0 border rounded-full",
                  imagePreview ? "p-0" : "p-5",
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
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={50} />
                )}
              </FormLabel>
              <FormControl>
                <Input
                  id="image"
                  type="file"
                  className="dark:bg-inherit"
                  accept="image/jpeg"
                  onChange={(e) => {
                    field.onChange(e.target.files && e.target.files[0]);
                    handleImageChange(e);
                  }}
                />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  form.formState.errors.name && "dark:text-red-400"
                )}
              >
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="your full name"
                  className="dark:bg-inherit"
                  onChange={field.onChange}
                  value={field.value}
                  name={field.name}
                  ref={field.ref}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  form.formState.errors.email && "dark:text-red-400"
                )}
              >
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your edu email"
                  className="dark:bg-inherit"
                  onChange={field.onChange}
                  value={field.value}
                  name={field.name}
                  ref={field.ref}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  form.formState.errors.password && "dark:text-red-400"
                )}
              >
                Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="your password"
                  className="dark:bg-inherit"
                  onChange={field.onChange}
                  value={field.value}
                  name={field.name}
                  ref={field.ref}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel
                className={cn(
                  form.formState.errors.phoneNo && "dark:text-red-400"
                )}
              >
                Phone No.
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="your phone no."
                  className="dark:bg-inherit"
                  onChange={field.onChange}
                  value={field.value}
                  name={field.name}
                  ref={field.ref}
                  disabled={field.disabled}
                />
              </FormControl>
              <FormDescription className="dark:text-slate-200">
                Please don{`'`}t include +91- or +91
              </FormDescription>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="college"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-2 min-w-0">
              <FormLabel
                className={cn(
                  form.formState.errors.college && "dark:text-red-400"
                )}
              >
                College
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="dark:bg-inherit">
                    <SelectValue placeholder="your college" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vidyalankar Institute of Technology, Mumbai">
                      Vidyalankar Institute of Technology, Mumbai
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="dark:text-red-400" />
            </FormItem>
          )}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full flex items-center gap-2"
        >
          {form.formState.isSubmitting && <Spinner />}
          Signup
        </Button>
      </form>
    </Form>
  );
}
