"use server";

import axios, { AxiosError } from "axios";

import { cookies } from "next/headers";
import type { z } from "zod";
import type { CreateRequestSchema } from "@/types/zodSchema";

const BASE_URL = "http://localhost:5000/api/v1";

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
      const data = await response.data.msg;
      return { success: data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}
