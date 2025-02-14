import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import UserListings from "../user-listings";
import UserRequests from "../user-requests";

const Tab = createMaterialTopTabNavigator();

export default function Account() {
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
                uri: "https://avatars.githubusercontent.com/u/88198352?v=4",
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
              }}
            />

            <Link href={"/edit-profile/1"}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Feather size={24} name="edit" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  Edit profile
                </Text>
              </View>
            </Link>
          </View>

          <Text style={{ fontSize: 20, fontWeight: "900" }}>
            Dipanshu Torawane
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Feather size={24} name="mail" />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              dipanshu.torawane@vit.edu.in
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Feather size={24} name="phone" />
            <Text style={{ fontSize: 15, fontWeight: "700" }}>9345965464</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
            <FontAwesome5 size={24} name="building" />
            <Text style={{ fontSize: 15, fontWeight: "700" }}>
              Vidyalankar Institute of Technology, Mumbai
            </Text>
          </View>
        </View>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            borderBottomWidth: 4,
            borderBottomColor: "#52796F",
          },
          tabBarLabelStyle: {
            fontSize: 15,
            color: "#52796F",
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
