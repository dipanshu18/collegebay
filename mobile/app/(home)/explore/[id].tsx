import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function PostDetails() {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Post Details: {id}</Text>
    </View>
  );
}
