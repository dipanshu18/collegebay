import { getRequests } from "@/api/queries";
import { RequestCard } from "@/components/request-card";
import { COLOR } from "@/constants/COLOR";
import { useQuery } from "@tanstack/react-query";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { queryClient } from "../_layout";
import { useCallback, useState } from "react";

export default function Requests() {
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

  const {
    data: requests,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: getRequests,
  });

  if (isLoading && !isPending) {
    return <ActivityIndicator color={COLOR.primary} />;
  }
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
