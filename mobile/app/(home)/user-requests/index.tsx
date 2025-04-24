import { getProfile } from "@/api/queries";
import { queryClient } from "@/app/_layout";
import { RequestCard } from "@/components/request-card";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function UserRequests() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      await queryClient.invalidateQueries({
        queryKey: ["requests"],
      });
      setRefreshing(false);
    }, 2000);
  }, []);

  const { data, isLoading, isPending } = useQuery({
    queryKey: ["requests"],
    queryFn: getProfile,
  });

  if (isLoading && !isPending) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        paddingHorizontal: 10,
        // flex: 1,
        gap: 10,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {data?.requests && data.requests.length > 0 ? (
        data.requests.map((item) => {
          return <RequestCard key={item.id} type="user" request={item} />;
        })
      ) : (
        <Text style={{ fontSize: 15, fontWeight: 500, textAlign: "center" }}>
          No requests made yet
        </Text>
      )}
    </ScrollView>
  );
}
