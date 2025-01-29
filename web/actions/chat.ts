"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axios, { AxiosError } from "axios";
import type { IChat } from "./types";

const BASE_URL = "http://localhost:5000/api/v1";

export async function getAllChats() {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.get(`${BASE_URL}/chats`, {
      withCredentials: true,
      headers: {
        Cookie: `session=${session}`,
      },
    });

    if (response.status === 200) {
      const data = await response.data.chats;
      return { success: data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function getChat(id: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.get(`${BASE_URL}/chats/${id}`, {
      withCredentials: true,
      headers: {
        Cookie: `session=${session}`,
      },
    });

    if (response.status === 200) {
      const data = await response.data.chat;
      return { success: data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function startChat(withUserId: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.post(
      `${BASE_URL}/chats`,
      {
        withUserId,
      },
      {
        withCredentials: true,
        headers: {
          Cookie: `session=${session}`,
        },
      }
    );

    if (response.status === 201) {
      const data = await response.data.msg;
      revalidatePath("/messages");
      return { success: data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}
