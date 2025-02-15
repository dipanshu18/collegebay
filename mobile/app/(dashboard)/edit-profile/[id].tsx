import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EditProfile() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Edit Profile: {id}</Text>
    </View>
  );
}
