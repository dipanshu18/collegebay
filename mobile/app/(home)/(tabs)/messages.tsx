import { getChats } from "@/api/queries";
import { queryClient } from "@/app/_layout";
import { MessageCard } from "@/components/message-card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
} from "react-native";

export default function Messages() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      await queryClient.invalidateQueries({
        queryKey: ["chats"],
      });
      setRefreshing(false);
    }, 2000);
  }, []);

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
          renderItem={({ item }) => <MessageCard chat={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <Text>No messages yet</Text>
      )}
    </>
  );
}
