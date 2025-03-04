import { AuthProvider } from "@/context/AuthContext";

import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { COLOR } from "@/constants/COLOR";
import { Feather } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SocketProvider } from "@/context/SocketContext";

export const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Roboto: require("../assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <SocketProvider>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="login"
              options={{
                headerTitle: "Login",
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "900",
                  color: COLOR.primary,
                  fontFamily: "Roboto",
                },
                headerShadowVisible: false,
                headerLeft: () => (
                  <Link href="/">
                    <Feather
                      size={24}
                      name="arrow-left"
                      color={COLOR.primary}
                    />
                  </Link>
                ),
              }}
            />
            <Stack.Screen
              name="signup"
              options={{
                headerTitle: "Signup",
                headerTitleAlign: "center",
                headerTitleStyle: {
                  fontSize: 20,
                  fontWeight: "900",
                  color: COLOR.primary,
                  fontFamily: "Roboto",
                },
                headerShadowVisible: false,
                headerLeft: () => (
                  <Link href="/">
                    <Feather
                      size={24}
                      name="arrow-left"
                      color={COLOR.primary}
                    />
                  </Link>
                ),
              }}
            />
            <Stack.Screen name="(home)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar />
        </QueryClientProvider>
      </SocketProvider>
    </AuthProvider>
  );
}
