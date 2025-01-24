import type { Metadata } from "next";

import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/navbar";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default function AdminLogin() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <LoginForm type="admin" />
          </div>
        </div>
      </div>
      <div className="lg:bg-light flex justify-center items-center">
        <div className="relative hidden lg:block p-5 h-1/2 w-1/2 m-auto">
          <Image
            src="/login.svg"
            width={100}
            height={100}
            alt="Login user welcome logo"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
