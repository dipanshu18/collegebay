import { markAsRead } from "@/api/mutations";
import { getUserNotifications } from "@/api/queries";
import type { IUserNotification } from "@/api/types";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from "react-native";

export default function Notifications() {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<IUserNotification[]>();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      const result = await getUserNotifications();
      setNotifications(result);
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    (async () => {
      const result = await getUserNotifications();
      setNotifications(result);
    })();
  }, []);

  return (
    <View>
      {notifications && notifications.length > 0 ? (
        <FlatList
          data={notifications}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={async () => {
                  await markAsRead(item.id);
                  router.reload();
                }}
                style={({ pressed }) => ({
                  backgroundColor: pressed ? "lightgrey" : "transparent", // Light gray on press
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                })}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
                >
                  <View
                    style={{
                      borderRadius: 100,
                      backgroundColor: "#E5E7EB",
                    }}
                  >
                    {item.action.image ? (
                      <Image
                        source={{
                          uri: item.action.image,
                        }}
                        width={50}
                        height={50}
                      />
                    ) : (
                      <Entypo name="user" size={30} style={{ padding: 10 }} />
                    )}
                  </View>
                  <View style={{ maxWidth: "80%" }}>
                    <Text
                      style={[
                        { fontSize: 15, fontWeight: "400" },
                        !item.read && { fontWeight: "700" },
                      ]}
                    >
                      {item.message}
                    </Text>
                  </View>
                </View>
                <View>{!item.read && <Entypo name="check" size={24} />}</View>
              </Pressable>
            );
          }}
        />
      ) : (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 500,
            }}
          >
            No notifications yet
          </Text>
        </View>
      )}
    </View>
  );
}
