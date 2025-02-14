import { Feather } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export function NotificationCard() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        borderTopWidth: 1,
        borderTopColor: "lightgrey",
        padding: 10,
      }}
    >
      <Image
        source={{
          uri: "https://avatars.githubusercontent.com/u/88198352?v=4",
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 100,
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          notification message
        </Text>
        <Feather size={24} name="check" style={{ paddingRight: 10 }} />
      </View>
    </View>
  );
}
