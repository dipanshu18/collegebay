"use client";

import { UpdateProfileSchema } from "@/types/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { User } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { UserProfile } from "@/types/index";

export default function UpdateProfileForm({ user }: { user: UserProfile }) {
  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    mode: "onChange",
    defaultValues: {
      ...user,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(
    user ? `https://dzgbuobd25m4d.cloudfront.net/${user.image}` : null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function updateProfile(values: z.infer<typeof UpdateProfileSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateProfile)} className="space-y-5">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            return (
              <FormItem className="flex flex-wrap justify-center md: md:flex-nowrap items-center whitespace-nowrap gap-5">
                <FormLabel
                  htmlFor="profile"
                  className={cn(
                    "flex items-center justify-center h-32 w-32 flex-shrink-0 border rounded-full",
                    imagePreview ? "p-0" : "p-5"
                  )}
                >
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <Image
                      src={imagePreview}
                      alt="Selected Image"
                      width={200}
                      height={200}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User size={50} />
                  )}
                </FormLabel>
                <FormControl>
                  <Input
                    id="profile"
                    type="file"
                    className="dark:bg-inherit"
                    accept="image/jpeg"
                    onChange={(e) => {
                      field.onChange(e);
                      handleImageChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel
                  className={cn(
                    form.formState.errors.name && "dark:text-red-400"
                  )}
                >
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input type="text" className="dark:bg-inherit" {...field} />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />
        <FormField
          name="phoneNo"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel
                  className={cn(
                    form.formState.errors.phoneNo && "dark:text-red-400"
                  )}
                >
                  Phone No
                </FormLabel>
                <FormControl>
                  <Input type="text" className="dark:bg-inherit" {...field} />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => {
            return (
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
                    className="dark:bg-inherit"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />
        <Button className="w-full" type="submit">
          Save Changes
        </Button>
      </form>
    </Form>
  );
}
