import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EditPost() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Edit post: {id}</Text>
    </View>
  );
}
