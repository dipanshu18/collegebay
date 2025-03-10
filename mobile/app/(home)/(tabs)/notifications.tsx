import { getUserNotifications } from "@/api/queries";
import { NotificationCard } from "@/components/notification-card";
import { Entypo } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Notifications() {
  const { data, isLoading } = useQuery({
    queryKey: ["userNotifications"],
    queryFn: getUserNotifications,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  console.log(data);

  return (
    <View style={{ padding: 10 }}>
      {data && data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: 10,
                  paddingHorizontal: 10,
                  marginVertical: 5,
                  borderTopWidth: 0.5,
                  borderColor: "lightgrey",
                }}
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
              </View>
            );
          }}
        />
      ) : (
        <Text style={{ fontSize: 15, fontWeight: 500 }}>
          No notifications yet
        </Text>
      )}
    </View>
  );
}
