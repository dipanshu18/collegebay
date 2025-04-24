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

export default function UserListings() {
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
    <>
      <View style={{ padding: 10 }}>
        {data?.posts && data?.posts.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.posts}
            renderItem={({ item }) => {
              return (
                <Link
                  key={item.id}
                  href={`/user-listings/${item.id}`}
                  style={{ marginVertical: 10 }}
                >
                  <ListingCard post={item} />
                </Link>
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <Text style={{ fontSize: 15, fontWeight: 500, textAlign: "center" }}>
            No listings posted yet
          </Text>
        )}
      </View>
    </>
  );
}
