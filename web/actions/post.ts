"use server";

import axios, { AxiosError } from "axios";

import { cookies } from "next/headers";
import type { z } from "zod";
import type { CreatePostSchema } from "@/types/zodSchema";
import { revalidatePath } from "next/cache";

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
      return { success: data };
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
      return { success: data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function fetchFilteredPosts(category: string, query?: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.get(
      `${BASE_URL}/posts/filters?q=${query}&category=${category}`,
      {
        withCredentials: true,
        headers: {
          Cookie: `session=${session}`,
        },
      }
    );

    if (response.status === 200) {
      const data = await response.data.posts;
      return { success: data };
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
      const data = await response.data.msg;
      return { success: data };
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

export async function updatePost(
  postId: string,
  modifiedData: Partial<{
    title?: string | undefined;
    category?: string | undefined;
    price?: string | undefined;
    description?: string | undefined;
    images?: string[] | undefined;
  }>
) {
  const session = cookies().get("session")?.value;
  try {
    if (modifiedData) {
      const response = await axios.patch(
        `${BASE_URL}/posts/${postId}`,
        modifiedData,
        {
          withCredentials: true,
          headers: {
            Cookie: `session=${session}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.data.msg;
        revalidatePath("/profile");
        revalidatePath(`/profile/posts/${postId}`);
        revalidatePath(`/profile/posts/${postId}/edit`);
        return { success: data };
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

export async function postSold(postId: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.patch(
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
      const data = await response.data.msg;
      console.log(data);
      return { success: data };
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
      const data = await response.data.msg;
      revalidatePath("/profile");
      return { success: data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}
