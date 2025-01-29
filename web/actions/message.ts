"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import axios, { AxiosError } from "axios";

const BASE_URL = "http://localhost:5000";

export async function sendMessage(chatId: string, text: string) {
  const session = cookies().get("session")?.value;

  try {
    const response = await axios.post(
      `${BASE_URL}/messages/${chatId}`,
      {
        text,
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
      revalidatePath(`/messages/${chatId}`);
      return { success: data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function deleteMessage(chatId: string, messageId: string) {
  const session = cookies().get("session")?.value;

  try {
    const response = await axios.delete(
      `${BASE_URL}/messages/${chatId}/${messageId}`,
      {
        withCredentials: true,
        headers: {
          Cookie: `session=${session}`,
        },
      }
    );

    if (response.status === 200) {
      const data = await response.data.msg;
      revalidatePath("/messages");
      revalidatePath(`/messages/${chatId}`);
      return { success: data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}
