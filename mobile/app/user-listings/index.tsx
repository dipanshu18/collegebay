import { ListingCard } from "@/components/listing-card";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";

export default function UserListings() {
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
      {Array(5)
        .fill("")
        .map((_, idx) => {
          return (
            <Link
              /* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */
              key={idx}
              href={`/user-listings/${idx}`}
              style={{ marginVertical: 10 }}
            >
              <ListingCard />
            </Link>
          );
        })}
    </ScrollView>
  );
}
