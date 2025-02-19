import { login } from "@/api/mutations";
import { COLOR } from "@/constants/COLOR";
import useAuth from "@/hooks/useAuth";
import { Feather } from "@expo/vector-icons";
import { Redirect, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  const { isAuth, login } = useAuth();

  if (isAuth) {
    return <Redirect href={"/(home)/(tabs)"} />;
  }

  const [credentials, setCredentials] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={{ marginHorizontal: "auto" }}>
          <Image
            source={require("@/assets/login.jpg")}
            style={{ width: 300, height: 300 }}
          />
        </View>

        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.inputBox}
              placeholder="enter your email"
              keyboardType="email-address"
              onChangeText={(text) =>
                setCredentials({ ...credentials, email: text })
              }
              value={credentials?.email}
            />
          </View>

          <View>
            <TextInput
              style={styles.inputBox}
              placeholder="enter your password"
              onChangeText={(text) =>
                setCredentials({ ...credentials, password: text })
              }
              value={credentials?.password}
              secureTextEntry
            />
          </View>

          <Pressable
            onPress={() => {
              login(credentials);
            }}
            style={styles.loginBtn}
          >
            <Text style={styles.btnText}>Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, gap: 10, fontFamily: "Roboto" },
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
