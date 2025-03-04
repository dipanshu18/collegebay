import { getChats } from "@/api/queries";
import { MessageCard } from "@/components/message-card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, ScrollView, Text } from "react-native";

export default function Messages() {
  const { data: chats, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <>
      {chats && chats.length > 0 ? (
        <FlatList
          data={chats}
          renderItem={({ item }) => {
            return (
              <Link href={`/messages/${item.id}`} style={{ flex: 1 }}>
                <MessageCard chat={item} />
              </Link>
            );
          }}
        />
      ) : (
        <Text>No messages yet</Text>
      )}
    </>
  );
}
