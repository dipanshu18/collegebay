import { getRequests } from "@/api/queries";
import { RequestCard } from "@/components/request-card";
import { RefreshControl, ScrollView, Text } from "react-native";
import { queryClient } from "../_layout";
import { useCallback, useEffect, useState } from "react";
import type { IUserRequest } from "@/api/types";

export default function Requests() {
  const [refreshing, setRefreshing] = useState(false);
  const [requests, setRequests] = useState<IUserRequest[]>([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      await queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    (async () => {
      const result = await getRequests();
      setRequests(result);
    })();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        padding: 10,
        flex: 1,
        gap: 10,
        marginBottom: 10,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {requests && requests.length > 0 ? (
        requests.map((item) => {
          return <RequestCard key={item.id} type="public" request={item} />;
        })
      ) : (
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          No requests made yet
        </Text>
      )}
    </ScrollView>
  );
}
