import { getPosts } from "@/api/queries";
import { ListingCard } from "@/components/listing-card";
import { COLOR } from "@/constants/COLOR";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState();

  const {
    data: posts,
    isLoading,
    isPending,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
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
    >
      <View style={{ gap: 15 }}>
        <TextInput
          placeholder="Search ..."
          style={{
            borderWidth: 1,
            padding: 15,
            fontSize: 15,
            borderRadius: 10,
            borderColor: "#ced4da",
          }}
        />

        <RNPickerSelect
          placeholder={{
            label: "Product Category",
          }}
          onValueChange={(value) => setSelectedCategory(value)}
          items={[
            { label: "NOTES", value: "NOTES" },
            { label: "EQUIPMENT", value: "EQUIPMENT" },
            { label: "BOOKS", value: "BOOKS" },
            { label: "ELECTRONICS", value: "ELECTRONICS" },
            { label: "FURNITURE", value: "FURNITURE" },
          ]}
          style={{
            viewContainer: {
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#ced4da",
            },
          }}
        />
      </View>
      {posts && posts.length > 0 ? (
        posts.map((item) => {
          return (
            <Link
              key={item.id}
              href={`/explore/${item.id}`}
              style={{ width: "100%", marginVertical: 15 }}
            >
              <ListingCard post={item} />
            </Link>
          );
        })
      ) : (
        <Text>No listings posted yet</Text>
      )}
    </ScrollView>
  );
}
