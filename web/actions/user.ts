"use server";

import axios, { AxiosError } from "axios";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import type { z } from "zod";
import type { CreatePostSchema, CreateRequestSchema } from "@/types/zodSchema";

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

export async function fetchRequests() {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.get(`${BASE_URL}/requests`, {
      withCredentials: true,
      headers: {
        Cookie: `session=${session}`,
      },
    });

    if (response.status === 200) {
      const data = await response.data.requests;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

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

// export async function fetchUserPosts() {
//   try {
//     const response = await axios.get(`${BASE_URL}/posts/user`, {
//       withCredentials: true,
//     });

//     if (response.status === 200) {
//       const data = await response.data.posts;
//       return data ?? [];
//     }
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       const errorData = await error.response?.data.msg;
//       console.log(errorData);
//       return;
//     }
//   }
// }

// export async function fetchUserRequests() {
//   try {
//     const response = await axios.get(`${BASE_URL}/requests/user`, {
//       withCredentials: true,
//     });

//     if (response.status === 200) {
//       const data = await response.data.requests;
//       return data ?? [];
//     }
//   } catch (error) {
//     if (error instanceof AxiosError) {
//       const errorData = await error.response?.data.msg;
//       console.log(errorData);
//       return;
//     }
//   }
// }

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

export async function createRequest(
  values: z.infer<typeof CreateRequestSchema>
) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.post(`${BASE_URL}/requests/create`, values, {
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

export async function upVoteRequest(requestId: string) {
  const session = cookies().get("session")?.value;
  try {
    await axios.post(
      `${BASE_URL}/requests/upvote/${requestId}`,
      {},
      {
        withCredentials: true,
        headers: {
          Cookie: `session=${session}`,
        },
      }
    );
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

export async function deleteRequest(requestId: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.delete(`${BASE_URL}/requests/${requestId}`, {
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
