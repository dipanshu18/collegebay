import { getChats } from "@/api/queries";
import type { IChat } from "@/api/types";
import { MessageCard } from "@/components/message-card";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";

export default function Messages() {
  const [refreshing, setRefreshing] = useState(false);

  const [chats, setChats] = useState<IChat[]>([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      const result = await getChats();
      setChats(result);
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    (async () => {
      const result = await getChats();
      setChats(result);
    })();
  }, []);

  return (
    <View>
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
    </View>
  );
}
