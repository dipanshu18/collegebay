import { ListingCard } from "@/components/listing-card";
import { Link } from "expo-router";
import { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function Explore() {
  const [selectedCategory, setSelectedCategory] = useState();

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
      {Array(5)
        .fill("")
        .map((_, idx) => {
          return (
            <Link
              /* biome-ignore lint/suspicious/noArrayIndexKey: <explanation> */
              key={idx}
              href={`/explore/${idx}`}
              style={{ width: "100%", marginVertical: 15 }}
            >
              <ListingCard />
            </Link>
          );
        })}
    </ScrollView>
  );
}
