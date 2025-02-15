import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ChatBox() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Chat box: {id}</Text>
    </View>
  );
}
