import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, router } from "expo-router";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import UserListings from "@/app/(home)/user-listings";
import UserRequests from "@/app/(home)/user-requests";
import { getProfile } from "@/api/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { logout } from "@/api/mutations";
import { COLOR } from "@/constants/COLOR";

const Tab = createMaterialTopTabNavigator();

export default function Account() {
  const { data, isLoading, isPending } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const logoutMutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });

  if (isLoading && !isPending) {
    return <ActivityIndicator />;
  }

  return (
    <>
      <View>
        <View style={{ padding: 15, gap: 5 }}>
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

            <View>
              <Pressable
                onPress={() => logoutMutation.mutate()}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </Pressable>
            </View>
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

      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            borderBottomWidth: 4,
            borderBottomColor: "#354F52",
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: "#CAD2C5",
          },

          tabBarLabelStyle: {
            fontSize: 15,
            color: "#354F52",
            fontWeight: "700",
          },
        }}
      >
        <Tab.Screen
          name="user-listings"
          options={{
            title: "Listings",
          }}
          component={UserListings}
        />
        <Tab.Screen
          name="user-requests"
          options={{
            title: "Requests",
          }}
          component={UserRequests}
        />
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 15,
    color: "white",
    fontWeight: "500",
  },
});
