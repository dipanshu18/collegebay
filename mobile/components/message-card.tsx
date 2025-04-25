import type { IChat } from "@/api/types";
import { getValue } from "@/utils/secure-store";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export function MessageCard({ chat }: { chat: IChat }) {
  const router = useRouter();
  const userId = getValue("uid");
  const reciever = chat.participants.filter((p) => p.id !== userId)[0];
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <Pressable
      style={({ pressed }) => ({
        width: "100%",
        backgroundColor: pressed ? "lightgrey" : "transparent",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10,
        gap: 5,
        padding: 10,
      })}
      onPress={() => router.push(`/messages/${chat.id}`)}
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
        <Text style={{ fontSize: 15, fontWeight: "300", maxWidth: "90%" }}>
          {lastMessage
            ? lastMessage.senderId === userId
              ? "you: "
              : `${reciever.name}: `
            : null}
          {lastMessage
            ? lastMessage.text
            : "Start conversation by sending the first message"}
        </Text>
      </View>
    </Pressable>
  );
}
