import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import CreateListing from "../create-listing";
import CreateRequest from "../create-request";

const Tab = createMaterialTopTabNavigator();

export default function AddListingOrRequest() {
  return (
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
        name="create-listing"
        options={{
          title: "Create Listing",
        }}
        component={CreateListing}
      />
      <Tab.Screen
        name="create-request"
        options={{
          title: "Create Request",
        }}
        component={CreateRequest}
      />
    </Tab.Navigator>
  );
}
