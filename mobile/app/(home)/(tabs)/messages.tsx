import { getChats } from "@/api/queries";
import { MessageCard } from "@/components/message-card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ActivityIndicator, ScrollView, Text } from "react-native";

export default function Messages() {
  const {
    data: chats,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  if (isLoading && !isPending) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
      {chats && chats.length > 0 ? (
        chats.map((item) => (
          <Link key={item.id} href={`/messages/${item.id}`} style={{ flex: 1 }}>
            <MessageCard chat={item} />
          </Link>
        ))
      ) : (
        <Text>No messages yet</Text>
      )}
    </ScrollView>
  );
}
