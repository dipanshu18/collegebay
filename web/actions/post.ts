"use server";

import axios, { AxiosError } from "axios";

import { cookies } from "next/headers";
import type { z } from "zod";
import type { CreatePostSchema } from "@/types/zodSchema";

const BASE_URL = "http://localhost:5000/api/v1";

export async function fetchPosts() {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      withCredentials: true,
      headers: {
        Cookie: `session=${session}`,
      },
    });

    if (response.status === 200) {
      const data = await response.data.posts;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function fetchPost(postId: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}`, {
      withCredentials: true,
      headers: {
        Cookie: `session=${session}`,
      },
    });

    if (response.status === 200) {
      const data = await response.data.post;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function createPost(values: z.infer<typeof CreatePostSchema>) {
  const session = cookies().get("session")?.value;

  try {
    const response = await axios.post(`${BASE_URL}/posts`, values, {
      withCredentials: true,
      headers: {
        Cookie: `session=${session}`,
      },
    });

    if (response.status === 201) {
      const data = await response.data;
      return { success: data.msg };
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

export async function postSold(postId: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.put(
      `${BASE_URL}/posts/${postId}/sold`,
      {},
      {
        withCredentials: true,
        headers: {
          Cookie: `session=${session}`,
        },
      }
    );

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

export async function deletePost(postId: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.delete(`${BASE_URL}/posts/${postId}`, {
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
