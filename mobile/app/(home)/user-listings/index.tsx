import { getProfile } from "@/api/queries";
import { ListingCard } from "@/components/listing-card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserListings() {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: getProfile,
  });

  if (isLoading && !isPending) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
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
          />
        ) : (
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            No listings posted yet
          </Text>
        )}
      </View>
    </>
  );
}
