import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Image, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import UserListings from "@/app/(home)/user-listings";
import UserRequests from "@/app/(home)/user-requests";

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
                width: 60,
                height: 60,
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
                <Feather size={24} name="edit" color={"#52796F"} />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#52796F",
                  }}
                >
                  Edit profile
                </Text>
              </View>
            </Link>
          </View>

          <Text style={{ fontSize: 20, fontWeight: "900", color: "#354F52" }}>
            Dipanshu Torawane
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
            <Feather size={24} name="phone" color={"#52796F"} />
            <Text style={{ fontSize: 15, fontWeight: "700", color: "#2F3E46" }}>
              9345965464
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
              Vidyalankar Institute of Technology, Mumbai
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
