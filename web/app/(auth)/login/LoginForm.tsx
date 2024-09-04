"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/types/zodSchema";
import Spinner from "@/components/Spinner";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function login(values: z.infer<typeof LoginSchema>) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        values,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const data = await response.data;

        toast.success(data.msg);

        router.replace("/home");
        router.refresh();
        return;
      }
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.msg);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(login)}
        className="md:w-full md:max-w-lg max-w-md md:mx-auto space-y-4 my-5 p-5 border rounded-md shadow"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
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
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
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
                    placeholder="your password"
                    className="dark:bg-inherit"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            );
          }}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full flex items-center gap-2"
        >
          {form.formState.isSubmitting && <Spinner />}
          Login
        </Button>
      </form>
    </Form>
  );
}
