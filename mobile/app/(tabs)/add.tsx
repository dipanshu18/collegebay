import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { CreateListingScreen } from "@/screens/create-listing";
import { CreateRequestScreen } from "@/screens/create-request";

const Tab = createMaterialTopTabNavigator();

export default function AddListingOrRequest() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Create listing" component={CreateListingScreen} />
      <Tab.Screen name="Create request" component={CreateRequestScreen} />
    </Tab.Navigator>
  );
}
