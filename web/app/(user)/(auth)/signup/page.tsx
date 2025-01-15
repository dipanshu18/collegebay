import type { Metadata } from "next";

import { SignupForm } from "./signup-form";
import { Logo } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Signup",
};

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="lg:bg-light flex justify-center items-center">
        <div className="relative hidden lg:block p-5 h-1/2 w-1/2 m-auto">
          <img
            src="/signup.svg"
            alt="Signup user welcome logo"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  );
}
