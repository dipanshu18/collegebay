import { getProfile } from "@/api/queries";
import { ListingCard } from "@/components/listing-card";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";

export default function UserListings() {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: getProfile,
  });

  if (isLoading && !isPending) {
    return <ActivityIndicator />;
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
    >
      {data?.posts && data?.posts.length > 0 ? (
        data?.posts.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/user-listings/${item.id}`}
              style={{ marginVertical: 10 }}
            >
              <ListingCard post={item} />
            </Link>
          );
        })
      ) : (
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          No listings posted yet
        </Text>
      )}
    </ScrollView>
  );
}
