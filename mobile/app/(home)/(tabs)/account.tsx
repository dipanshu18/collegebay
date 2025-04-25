import { COLOR } from "@/constants/COLOR";
import useAuth from "@/hooks/useAuth";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Account() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.heading}>Collegebay</Text>
        </View>
        <View style={{ gap: 10 }}>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => router.push("/profile")}
          >
            <Text style={styles.text}>Profile</Text>
            <Entypo name="chevron-small-right" size={30} color="black" />
          </Pressable>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => router.push("/user-listings")}
          >
            <Text style={styles.text}>Listings</Text>
            <Entypo name="chevron-small-right" size={30} color="black" />
          </Pressable>
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => router.push("/user-requests")}
          >
            <Text style={styles.text}>Requests</Text>
            <Entypo name="chevron-small-right" size={30} color="black" />
          </Pressable>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => router.push("/user-purchased")}
          >
            <Text style={styles.text}>Purchased</Text>
            <Entypo name="chevron-small-right" size={30} color="black" />
          </Pressable>
        </View>
      </View>

      <View>
        <View>
          <Pressable onPress={logout} style={styles.button}>
            <MaterialIcons name="logout" size={24} color={"white"} />
            <Text style={styles.buttonText}>Logout</Text>
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
    paddingVertical: 20,
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
