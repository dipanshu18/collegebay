import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Explore from "../explore";
import Requests from "../requests";

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  return (
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
        name="explore"
        options={{
          title: "Explore",
        }}
        component={Explore}
      />
      <Tab.Screen
        name="requests"
        options={{
          title: "Requests",
        }}
        component={Requests}
      />
    </Tab.Navigator>
  );
}
