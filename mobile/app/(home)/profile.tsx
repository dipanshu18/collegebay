import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

import { getProfile } from "@/api/queries";
import { useQuery } from "@tanstack/react-query";
import { COLOR } from "@/constants/COLOR";
import useAuth from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

export default function Profile() {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const { logout } = useAuth();

  if (isLoading && !isPending) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "space-between", padding: 10 }}>
      <View>
        <View style={{ gap: 5 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Image
              source={{
                uri: data?.image,
              }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 100,
              }}
            />
          </View>

          <Text style={{ fontSize: 20, fontWeight: "900", color: "#354F52" }}>
            {data?.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Feather size={24} name="mail" color={"#52796F"} />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: "#2F3E46",
              }}
            >
              {data?.email}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Feather size={24} name="phone" color={"#52796F"} />
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#2F3E46" }}>
              {data?.phoneNo}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <FontAwesome5 size={24} name="building" color={"#52796F"} />
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#2F3E46" }}>
              {data?.college}
            </Text>
          </View>
        </View>
      </View>

      <View>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => router.push(`/edit-profile/${data?.id}`)}
          >
            <Feather name="edit" size={24} color={"white"} />
            <Text style={styles.buttonText}>Edit profile</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "800",
    color: COLOR.primary,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "500",
  },
  button: {
    backgroundColor: COLOR.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "500",
  },
});
