import axios, { AxiosError } from "axios";
import { BASE_URL } from "./queries";
import { deleteValue, getValue, saveValue } from "@/utils/auth";
import { router } from "expo-router";
import { Alert } from "react-native";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    if (response.status === 200) {
      const data = await response.data;

      await saveValue("token", data.token);
      await saveValue("uid", data.uid);

      router.replace("/(home)/(tabs)");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      Alert.alert(errorData);
    }
  }
}

export async function signup({
  email,
  name,
  password,
  college,
  phoneNo,
  image,
}: {
  name: string;
  phoneNo: string;
  college: string;
  image: string;
  email: string;
  password: string;
}) {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/signup`,
      {
        image,
        name,
        email,
        phoneNo,
        password,
        college,
      },
      { withCredentials: true }
    );

    if (response.status === 201) {
      const data = await response.data;

      saveValue("token", data.token);
      saveValue("uid", data.uid);

      router.replace("/(home)/(tabs)");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      console.log("Error:", errorData);
    }
  }
}

export async function logout() {
  const token = getValue("token");
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      const data = await response.data;

      await deleteValue("token");
      await deleteValue("uid");

      Alert.alert(data.msg);
      router.replace("/");
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      console.log("Error:", errorData);
    }
  }
}
