import { Pressable, Text, TextInput, View } from "react-native";
import { useState } from "react";
import RNPickerSelect from "react-native-picker-select";

export default function CreateListing() {
  const [selectedCategory, setSelectedCategory] = useState();

  return (
    <View style={{ flex: 1, marginVertical: 10, padding: 10, gap: 10 }}>
      <View>
        <TextInput
          placeholder="product image picker"
          style={{
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 15,
            borderColor: "#ced4da",
          }}
        />
      </View>
      <View>
        <TextInput
          placeholder="enter product title"
          style={{
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 15,
            padding: 15,
            borderColor: "#ced4da",
          }}
        />
      </View>
      <View>
        <TextInput
          placeholder="enter product description"
          multiline={true}
          numberOfLines={20}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 15,
            padding: 15,
            borderColor: "#ced4da",
          }}
        />
      </View>
      <View>
        <TextInput
          placeholder="enter your product resale price"
          style={{
            borderWidth: 1,
            borderRadius: 10,
            fontSize: 15,
            padding: 15,
            borderColor: "#ced4da",
          }}
        />
      </View>
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

      <Pressable
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          marginVertical: 10,
          paddingVertical: 15,
          backgroundColor: "#354F52",
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 15,
            fontWeight: "600",
            letterSpacing: 1,
          }}
        >
          Create
        </Text>
      </Pressable>
    </View>
  );
}
