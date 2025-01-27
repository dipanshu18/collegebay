"use server";

import axios, { AxiosError } from "axios";

import { cookies } from "next/headers";
import type { IPost, IUserRequest } from "./types";

const BASE_URL = "http://localhost:5000/api/v1";

export async function adminHome() {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.get(`${BASE_URL}/admin/all`, {
      withCredentials: true,
      headers: {
        Cookie: `session=${session}`,
      },
    });

    if (response.status === 200) {
      const data = (await response.data) as {
        posts: IPost[];
        requests: IUserRequest[];
      };
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function requestDetails(id: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.get(`${BASE_URL}/admin/requests/${id}`, {
      withCredentials: true,
      headers: {
        Cookie: `session=${session}`,
      },
    });

    if (response.status === 200) {
      const data = await response.data.request;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function approvePost(id: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/posts/approve/${id}`,
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
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function rejectPost(id: string, reason: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/posts/reject/${id}`,
      {
        reason,
      },
      {
        withCredentials: true,
        headers: {
          Cookie: `session=${session}`,
        },
      }
    );

    if (response.status === 200) {
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

export async function approveRequest(id: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/requests/approve/${id}`,
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
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      return { error: errorData };
    }
  }
}

export async function rejectRequest(id: string, reason: string) {
  const session = cookies().get("session")?.value;
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/requests/reject/${id}`,
      {
        reason,
      },
      {
        withCredentials: true,
        headers: {
          Cookie: `session=${session}`,
        },
      }
    );

    if (response.status === 200) {
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
