"use client";

import type { FormEvent } from "react";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export function Logout({ type }: { type: "ADMIN" | "USER" }) {
  const router = useRouter();

  async function handleLogout(e: FormEvent) {
    e.preventDefault();

    try {
      const response = await axios.post(
        type === "ADMIN"
          ? "http://localhost:5000/api/v1/admin/logout"
          : "http://localhost:5000/api/v1/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const data = await response.data.msg;

        toast.success(data);
        router.replace("/");
        return;
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorData = await error.response?.data.msg;
        toast.error(errorData);
        return;
      }
    }
  }

  return (
    <Button
      onClick={handleLogout}
      className="w-full bg-primary text-white hover:bg-accent"
    >
      <LogOut className="mr-2" /> Logout
    </Button>
  );
}
