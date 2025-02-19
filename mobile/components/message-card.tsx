import type { IChat } from "@/api/types";
import { getValue } from "@/utils/secure-store";
import { Image, Text, View } from "react-native";

export function MessageCard({ chat }: { chat: IChat }) {
  const userId = getValue("uid");
  const reciever = chat.participants.filter((p) => p.id !== userId)[0];
  const lastMessage = chat.messages[chat.messages.length - 1];

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
          uri: reciever.image,
        }}
        style={{
          width: 60,
          height: 60,
          borderRadius: 100,
        }}
      />
      <View>
        <Text style={{ fontSize: 20, fontWeight: "800" }}>{reciever.name}</Text>
        <Text style={{ fontSize: 15, fontWeight: "300" }}>
          {lastMessage.senderId === userId ? "you" : reciever.name}:{" "}
          {lastMessage.text}
        </Text>
      </View>
    </View>
  );
}
