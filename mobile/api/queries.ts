import { getValue } from "@/utils/secure-store";
import axios, { AxiosError } from "axios";
import { Alert } from "react-native";
import type {
  IChat,
  IPost,
  IUserNotification,
  IUserProfile,
  IUserRequest,
} from "./types";

export const BASE_URL = "http://10.0.2.2:5000/api/v1";
// export const BASE_URL = "http://192.168.0.148:5000/api/v1";

export async function getProfile() {
  const token = getValue("token");
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = (await response.data.user) as IUserProfile;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      Alert.alert(errorData);
    }
  }
}

export async function getPosts() {
  const token = getValue("token");
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = (await response.data.posts) as IPost[];
      return data;
    }

    return [];
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      Alert.alert(errorData);
    }

    return [];
  }
}

export async function getPost(id: string) {
  const token = getValue("token");
  try {
    const response = await axios.get(`${BASE_URL}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = (await response.data) as {
        post: IPost;
        sellerStats: { totalSoldWithRating: number; averageRating: number };
      };
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      Alert.alert(errorData);
    }
  }
}

export async function getRequests() {
  const token = getValue("token");
  try {
    const response = await axios.get(`${BASE_URL}/requests`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = (await response.data.requests) as IUserRequest[];
      return data;
    }

    return [];
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      console.log(errorData);
    }

    return [];
  }
}

export async function getChats() {
  const token = getValue("token");
  try {
    const response = await axios.get(`${BASE_URL}/chats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = (await response.data.chats) as IChat[];
      return data;
    }

    return [];
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;

      if (errorData === "No chat found") return;
      Alert.alert(errorData);
    }

    return [];
  }
}

export async function getUserNotifications() {
  const token = getValue("token");

  try {
    const response = await axios.get(`${BASE_URL}/user/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = (await response.data.notifications) as IUserNotification[];
      return data;
    }

    return [];
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      Alert.alert(errorData);
    }

    return [];
  }
}
