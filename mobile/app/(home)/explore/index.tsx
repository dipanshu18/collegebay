import { getPosts } from "@/api/queries";
import type { IPost } from "@/api/types";
import { ListingCard } from "@/components/listing-card";
import { COLOR } from "@/constants/COLOR";
import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  RefreshControl,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function Explore() {
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const [originalPosts, setOriginalPosts] = useState<IPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<IPost[]>([]);

  useEffect(() => {
    (async () => {
      const result = await getPosts();

      setOriginalPosts(result);
      setFilteredPosts(result);
    })();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(async () => {
      const updatedPosts = await getPosts();
      setOriginalPosts(updatedPosts);
      setFilteredPosts(updatedPosts);
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleSearch = () => {
    const filtered = originalPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "ALL" || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchText.toLowerCase()) ||
        post.description.toLowerCase().includes(searchText.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    setFilteredPosts(filtered);

    setSearchText("");
  };

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

        <Pressable style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
      </View>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((item) => (
          <Link
            key={item.id}
            href={`/explore/${item.id}`}
            style={{ width: "100%", marginVertical: 15 }}
          >
            <ListingCard post={item} />
          </Link>
        ))
      ) : (
        <Text style={{ fontSize: 15, fontWeight: "500", marginTop: 20 }}>
          No results found
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
