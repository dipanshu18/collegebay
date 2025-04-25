import axios, { AxiosError } from "axios";
import { BASE_URL } from "./queries";
import { deleteValue, getValue, saveValue } from "@/utils/secure-store";
import { router } from "expo-router";
import { Alert } from "react-native";
import type { CreatePostSchema, CreateRequestSchema } from "./schemas";
import type { z } from "zod";

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

      saveValue("token", data.token);
      saveValue("uid", data.uid);
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
      Alert.alert(data.msg);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      console.log("Error:", errorData);
    }
  }
}

export async function createPost(values: z.infer<typeof CreatePostSchema>) {
  const token = getValue("token");

  try {
    const response = await axios.post(`${BASE_URL}/posts`, values, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      const data = await response.data.msg;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data.msg;
      console.log(errorData);
      if (errorData) {
        // if (typeof errorData === "object") {
        //   // biome-ignore lint/complexity/noForEach: <explanation>
        //   Object.entries(errorData).forEach(async ([field, message]) => {
        //     toast.error(`${field}: ${message}`);
        //   });
        // }
      }
    }
  }
}

export async function createRequest(
  values: z.infer<typeof CreateRequestSchema>
) {
  const token = getValue("token");
  try {
    const response = await axios.post(`${BASE_URL}/requests/create`, values, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      const data = await response.data.msg;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data.msg;
      console.log(errorData);
      if (errorData) {
        // if (typeof errorData === "object") {
        //   // biome-ignore lint/complexity/noForEach: <explanation>
        //   Object.entries(errorData).forEach(async ([field, message]) => {
        //     toast.error(`${field}: ${message}`);
        //   });
        // }
      }
    }
  }
}

export async function upVoteRequest(id: string) {
  const token = getValue("token");
  try {
    const response = await axios.post(
      `${BASE_URL}/requests/upvote/${id}`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      router.reload();
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      console.log("Error:", errorData);
    }
  }
}

export async function deleteRequest(id: string) {
  const token = getValue("token");
  try {
    const response = await axios.delete(`${BASE_URL}/requests/${id}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data = await response.data.msg;
      Alert.alert(data);
      router.reload();
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      console.log("Error:", errorData);
    }
  }
}

export async function startChat(withUserId: string) {
  const token = getValue("token");
  try {
    const response = await axios.post(
      `${BASE_URL}/chats`,
      {
        withUserId,
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      const data = await response.data;
      return { success: "REDIRECT", chatId: data.chatId };
    }

    if (response.status === 201) {
      const data = await response.data;
      return { success: data.chatId };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function markAsRead(id: string) {
  const token = getValue("token");
  try {
    const response = await axios.patch(
      `${BASE_URL}/user/notifications/${id}`,
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      const data = await response.data.msg;
      return Alert.alert(data);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}
