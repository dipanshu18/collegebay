"use server";

import axios, { AxiosError } from "axios";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const BASE_URL = "http://localhost:5000/api/v1";

export async function fetchUserProfile() {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Cookie: `session=${session}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data.user;
      return { success: data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function updateProfile(
  modifiedData: Partial<{
    name?: string | undefined;
    password?: string | undefined;
    phoneNo?: string | undefined;
    image?: string | File | undefined;
  }>
) {
  const session = cookies().get("session")?.value;
  try {
    if (modifiedData) {
      const response = await axios.patch(`${BASE_URL}/user`, modifiedData, {
        withCredentials: true,
        headers: {
          Cookie: `session=${session}`,
        },
      });

      if (response.status === 200) {
        const data = await response.data;
        revalidatePath("/profile");
        revalidatePath("/home");
        return { success: data.msg };
      }
    } else {
      return { error: "Nothing to update" };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;

      return { error: errorData };
    }
  }
}

export async function deleteUser() {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.delete(`${BASE_URL}/user`, {
      withCredentials: true,
      headers: {
        Cookie: `session=${session}`,
      },
    });

    if (response.status === 200) {
      const data = await response.data;
      return { success: data.msg };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function fetchUserNotifications() {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.get(`${BASE_URL}/user/notifications`, {
      withCredentials: true,
      headers: {
        Cookie: `session=${session}`,
      },
    });

    if (response.status === 200) {
      const data = await response.data.notifications;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function markAsRead(id: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.patch(
      `${BASE_URL}/user/notifications/${id}`,
      {},
      {
        withCredentials: true,
        headers: {
          Cookie: `session=${session}`,
        },
      }
    );

    if (response.status === 200) {
      revalidatePath("/notifications");
      const data = await response.data.msg;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}
