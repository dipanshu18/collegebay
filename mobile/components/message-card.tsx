import { Image, Text, View } from "react-native";

export function MessageCard() {
  return (
    <View
      style={{
        width: "100%",
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
      <View>
        <Text style={{ fontSize: 20, fontWeight: "800" }}>
          Dipanshu Torawane
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "300" }}>you: hi</Text>
      </View>
    </View>
  );
}
