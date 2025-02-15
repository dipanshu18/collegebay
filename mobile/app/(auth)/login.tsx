import { COLOR } from "@/constants/COLOR";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.replace("/")} style={{}}>
        <Feather size={30} name="arrow-left-circle" color={COLOR.primary} />
      </Pressable>

      <View style={{ marginHorizontal: "auto" }}>
        <Image
          source={require("@/assets/login.jpg")}
          style={{ width: 300, height: 300 }}
        />
      </View>

      <Text style={styles.heading}>Login into your account</Text>

      <View style={styles.inputContainer}>
        <View>
          <TextInput
            style={styles.inputBox}
            placeholder="enter your email"
            keyboardType="email-address"
          />
        </View>

        <View>
          <TextInput
            style={styles.inputBox}
            placeholder="enter your password"
            secureTextEntry
          />
        </View>

        <Pressable style={styles.loginBtn}>
          <Text style={styles.btnText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, gap: 10, fontFamily: "Roboto" },
  heading: {
    fontSize: 25,
    fontWeight: "900",
    fontFamily: "Roboto",
    color: COLOR.primary,
    textAlign: "center",
  },
  inputContainer: {
    gap: 20,
    marginVertical: 10,
  },
  inputBox: {
    padding: 15,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLOR.grey,
  },
  loginBtn: {
    backgroundColor: COLOR.primary,
    paddingVertical: 20,
    borderRadius: 10,
  },
  btnText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
  },
});
