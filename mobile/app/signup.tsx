import { COLOR } from "@/constants/COLOR";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup() {
  const [selectedCategory, setSelectedCategory] = useState();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{ marginBottom: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginHorizontal: "auto" }}>
          <Image
            source={require("@/assets/signup.jpg")}
            style={{ width: 300, height: 300 }}
          />
        </View>

        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={styles.inputBox}
              placeholder="user profile upload"
            />
          </View>

          <View>
            <TextInput style={styles.inputBox} placeholder="enter your name" />
          </View>
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
              placeholder="enter your phone no"
              keyboardType="number-pad"
            />
          </View>

          <View>
            <TextInput
              style={styles.inputBox}
              placeholder="enter your password"
              secureTextEntry
            />
          </View>

          <RNPickerSelect
            onValueChange={(value) => setSelectedCategory(value)}
            placeholder={{
              label: "select college",
              color: "grey",
            }}
            items={[
              {
                label: "Vidyalankar Institute of Technology, Mumbai",
                value: "Vidyalankar Institute of Technology, Mumbai",
              },
            ]}
            style={{
              viewContainer: {
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#ced4da",
              },
            }}
          />

          <Pressable style={styles.loginBtn}>
            <Text style={styles.btnText}>Signup</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    gap: 10,
    fontFamily: "Roboto",
  },
  inputContainer: {
    gap: 20,
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
