import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { UserListingsScreen } from "@/screens/user-listings";
import { UserRequestsScreen } from "@/screens/user-requests";
import { Text, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

export default function Account() {
  return (
    <>
      <View>
        <Text>Dipanshu Torawane</Text>
      </View>

      <Tab.Navigator>
        <Tab.Screen name="Listings" component={UserListingsScreen} />
        <Tab.Screen name="Requests" component={UserRequestsScreen} />
      </Tab.Navigator>
    </>
  );
}
