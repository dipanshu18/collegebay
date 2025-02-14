import { Pressable, Text, TextInput, View } from "react-native";

export default function CreateRequest() {
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
