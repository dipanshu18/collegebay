import useAuth from "@/hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { Link, Redirect, Stack } from "expo-router";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { isAuth, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuth) {
    <Redirect href={"/login"} />;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#354F52",
          },
          headerStyle: {
            backgroundColor: "#CAD2C5",
          },
        }}
      >
        <Stack.Screen
          name="edit-profile/[id]"
          options={{
            title: "Edit profile",
            headerShown: true,
            headerLeft: () => (
              <Link href={"/account"}>
                <AntDesign size={24} name="arrowleft" color={"#354F52"} />
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="edit-post/[id]"
          options={{
            title: "Edit post",
            headerShown: true,
            headerLeft: () => (
              <Link href={"/account"}>
                <AntDesign size={24} name="arrowleft" color={"#354F52"} />
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="messages/[id]"
          options={{
            title: "",
            headerShown: true,
            headerLeft: () => (
              <Link href={"/messages"}>
                <AntDesign size={24} name="arrowleft" color={"#354F52"} />
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="explore/[id]"
          options={{
            title: "",
            headerShown: true,
            headerLeft: () => (
              <Link href={"/"}>
                <AntDesign size={24} name="arrowleft" color={"#354F52"} />
              </Link>
            ),
          }}
        />
        <Stack.Screen
          name="user-listings/[id]"
          options={{
            title: "",
            headerShown: true,
            headerLeft: () => (
              <Link href={"/account"}>
                <AntDesign size={24} name="arrowleft" color={"#354F52"} />
              </Link>
            ),
          }}
        />
      </Stack>
    </>
  );
}
