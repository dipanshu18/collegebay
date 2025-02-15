import useAuth from "@/hooks/useAuth";
import { Redirect, Slot } from "expo-router";
import { useEffect } from "react";

export default function OnBoardingLayout() {
  const { isAuth, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isAuth) {
    <Redirect href={"/explore"} />;
  }

  return <Slot />;
}
