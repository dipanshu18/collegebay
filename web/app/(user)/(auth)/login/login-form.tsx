"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/types/zodSchema";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/mutations";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["loginUser"],
    mutationFn: login,
    onSuccess: () => {
      router.replace("/home");
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit((values) => loginMutation.mutate(values))}
      className="space-y-5"
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold text-primary">
          Login to your account
        </h1>
        <p className="text-accent text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-2">
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-accent text-md">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            {...form.register("email")}
            placeholder="your edu email"
            className="py-6"
            required
          />
          {form.formState.errors.email && (
            <p className="text-red-500 text-base">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-accent text-md">
              Password
            </Label>
            {/* <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a> */}
          </div>
          <Input
            id="password"
            type="password"
            placeholder="your password"
            {...form.register("password")}
            className="py-6"
            required
          />
          {form.formState.errors.password && (
            <p className="text-red-500 text-base">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>
        <Button
          disabled={loginMutation.isPending}
          type="submit"
          className="w-full flex items-center gap-2 mt-5 bg-accent hover:bg-primary"
        >
          {loginMutation.isPending ? "Submitting..." : "Login"}
        </Button>
      </div>

      <div className="text-accent text-center text-sm mt-5">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-primary hover:text-info transition-all duration-300 underline underline-offset-4"
        >
          Sign up
        </Link>
      </div>
    </form>
  );
}
