import { Tabs } from "expo-router";
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#84A98C",
          tabBarStyle: {
            backgroundColor: "#354F52",
            paddingTop: 3,
            height: 60,
          },
          tabBarInactiveTintColor: "#CAD2C5",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "700",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <AntDesign size={24} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                size={24}
                name="message-outline"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          options={{
            title: "Add",
            tabBarIcon: ({ color }) => (
              <Entypo size={24} name="plus" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={24} name="bell-o" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => (
              <Feather size={24} name="user" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
