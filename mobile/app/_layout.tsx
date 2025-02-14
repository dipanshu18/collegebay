import { Slot, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="edit-profile"
          options={{
            title: "Edit profile",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="edit-post"
          options={{
            title: "Edit post",
            headerShown: true,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
