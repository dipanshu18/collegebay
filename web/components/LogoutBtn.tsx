"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

export default function LogoutBtn() {
  const router = useRouter();

  async function logout() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        const data = await response.data;

        toast(data.msg);

        router.replace("/home");
        router.refresh();
        return;
      }
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        return toast(error.response?.data.msg);
      }
    }
  }

  return <Button onClick={logout}>Logout</Button>;
}
