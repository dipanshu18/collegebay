import { MessageCard } from "@/components/message-card";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function Messages() {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {Array(10)
        .fill("")
        .map((_, idx) => (
          <Link
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={idx}
            href={`/messages/${idx}`}
            style={{ flex: 1 }}
          >
            <MessageCard />
          </Link>
        ))}
    </ScrollView>
  );
}
