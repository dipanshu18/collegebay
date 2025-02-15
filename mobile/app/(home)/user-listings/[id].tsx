import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function UserListingsDetails() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>User Listing: {id}</Text>
    </View>
  );
}
