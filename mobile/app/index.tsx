import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import useAuth from "@/hooks/useAuth";
import { Redirect, router } from "expo-router";
import { COLOR } from "@/constants/COLOR";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Landing() {
  const { isAuth } = useAuth();

  if (isAuth) {
    return <Redirect href={"/(home)/(tabs)"} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: "auto" }}>
        <Image
          source={require("@/assets/landing.jpg")}
          style={{ width: 400, height: 400 }}
        />
      </View>
      <Text style={styles.heading}>Welcome to Collegebay!</Text>
      <Text style={[styles.text]}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
        aspernatur natus ad laboriosam impedit vel totam at repudiandae itaque
        rem!
      </Text>

      <Pressable
        onPress={() => router.push("/signup")}
        style={[styles.button, { backgroundColor: COLOR.primary }]}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: "white",
            },
          ]}
        >
          Let's get started
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/login")}
        style={[styles.button, { backgroundColor: COLOR.light }]}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: COLOR.secondary,
            },
          ]}
        >
          I already have an account{" "}
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "white",
    gap: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "900",
    color: COLOR.primary,
    fontFamily: "Roboto",
    letterSpacing: 0.1,
    marginVertical: 5,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: COLOR.accent,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
});
