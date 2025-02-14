import { AntDesign } from "@expo/vector-icons";
import "./globals.css";

import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "center",
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
      <StatusBar style="auto" />
    </>
  );
}
