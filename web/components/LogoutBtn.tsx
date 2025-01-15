"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/mutations";

export default function LogoutBtn() {
  const router = useRouter();

  const logoutMutation = useMutation({
    mutationKey: ["logoutUser"],
    mutationFn: logout,
    onSuccess: () => {
      router.replace("/login");
      router.refresh();
    },
  });

  return (
    <Button onClick={() => logoutMutation.mutate()} className="w-full">
      Logout
    </Button>
  );
}
