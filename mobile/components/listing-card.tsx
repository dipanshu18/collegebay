import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

export function ListingCard() {
  return (
    <View
      style={{
        width: "100%",
        borderRadius: 10,
        backgroundColor: "#e9ecef",
      }}
    >
      <Image
        source={{
          uri: "https://plus.unsplash.com/premium_photo-1672256330854-98c717493128?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWF0aHxlbnwwfHwwfHx8MA%3D%3D",
        }}
        style={{
          aspectRatio: 16 / 9,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 20, fontWeight: "800" }}>Card Title</Text>
        <Text style={{ fontSize: 15, fontWeight: "400" }}>
          Card Description
        </Text>
        <Text style={{ fontSize: 15, fontWeight: "300" }}>createdAt</Text>
      </View>
    </View>
  );
}
