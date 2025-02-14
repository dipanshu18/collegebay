import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Messages() {
  return (
    <View>
      <Text>Messages</Text>

      <Link href={"/messages/1"}>
        <Text>Message details</Text>
      </Link>
    </View>
  );
}
