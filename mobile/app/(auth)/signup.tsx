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

export default function Signup() {
  const [selectedCategory, setSelectedCategory] = useState();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Pressable onPress={() => router.replace("/")} style={{}}>
        <Feather size={30} name="arrow-left-circle" color={COLOR.primary} />
      </Pressable>

      <View style={{ marginHorizontal: "auto" }}>
        <Image
          source={require("@/assets/signup.jpg")}
          style={{ width: 300, height: 300 }}
        />
      </View>

      <Text style={styles.heading}>Create an account</Text>

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
