import useAuth from "@/hooks/useAuth";
import { AntDesign } from "@expo/vector-icons";
import { Link, Redirect, SplashScreen, Stack } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function DashboardLayout() {
  const { isAuth } = useAuth();

  if (!isAuth) {
    return <Redirect href={"/login"} />;
  }

  return (
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
      <Stack.Screen name="(tabs)" />

      <Stack.Screen
        name="profile"
        options={{
          title: "Your profile",
          headerShown: true,
          headerLeft: () => (
            <Link href={"/account"}>
              <AntDesign size={24} name="arrowleft" color={"#354F52"} />
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="user-listings/index"
        options={{
          title: "Listings",
          headerShown: true,
          headerLeft: () => (
            <Link href={"/account"}>
              <AntDesign size={24} name="arrowleft" color={"#354F52"} />
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="user-requests/index"
        options={{
          title: "Requests",
          headerShown: true,
          headerLeft: () => (
            <Link href={"/account"}>
              <AntDesign size={24} name="arrowleft" color={"#354F52"} />
            </Link>
          ),
        }}
      />

      <Stack.Screen
        name="edit-profile/[id]"
        options={{
          title: "Edit profile",
          headerShown: true,
          headerLeft: () => (
            <Link href={"/profile"}>
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
            <Link href={"/user-listings"}>
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
            <Link href={"/user-listings"}>
              <AntDesign size={24} name="arrowleft" color={"#354F52"} />
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
