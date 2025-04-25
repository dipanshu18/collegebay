import { getProfile } from "@/api/queries";
import { queryClient } from "@/app/_layout";
import { ListingCard } from "@/components/listing-card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserPurchased() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      await queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      setRefreshing(false);
    }, 2000);
  }, []);

  const { data, isLoading, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: getProfile,
  });

  if (isLoading && !isPending) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ padding: 20 }}>
      {data?.purchasedItems && data?.purchasedItems.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.purchasedItems}
          renderItem={({ item }) => {
            return <ListingCard post={item} />;
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View
          style={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 500, textAlign: "center" }}>
            No purchase yet
          </Text>
        </View>
      )}
    </View>
  );
}
