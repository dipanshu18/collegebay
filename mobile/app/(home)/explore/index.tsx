import { getPosts } from "@/api/queries";
import { IPost } from "@/api/types";
import { ListingCard } from "@/components/listing-card";
import { COLOR } from "@/constants/COLOR";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function Explore() {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (isLoading) {
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
          onChangeText={setSearchText}
          value={searchText}
        />

        <RNPickerSelect
          placeholder={{
            label: "Product Category",
          }}
          onValueChange={(value) => setSelectedCategory(value)}
          value={selectedCategory}
          items={[
            { label: "All", value: "ALL" },
            { label: "Notes", value: "NOTES" },
            { label: "Equipment", value: "EQUIPMENT" },
            { label: "Books", value: "BOOKS" },
            { label: "Electronics", value: "ELECTRONICS" },
            { label: "Furniture", value: "FURNITURE" },
          ]}
          style={{
            viewContainer: {
              borderWidth: 1,
              borderRadius: 10,
              borderColor: "#ced4da",
            },
          }}
        />

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
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
        <Text style={{ fontSize: 15, fontWeight: "500" }}>
          No listings posted yet
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: COLOR.primary,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
    fontWeight: "500",
  },
});
