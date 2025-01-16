"use server";

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { toast } from "sonner";

const BASE_URL = "http://localhost:5000/api/v1";
const session = cookies().get("session")?.value;

export async function fetchPosts() {
  try {
    const response = await axios.get(`${BASE_URL}/posts`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data.posts;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.msg);
    }
  }
}

export async function fetchPost(postId: string) {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${postId}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data.post;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      toast.error(errorData);
    }
  }
}

export async function fetchRequests() {
  try {
    const response = await axios.get(`${BASE_URL}/requests`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data.requests;
      return data;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.msg);
    }
  }
}

export async function fetchUserProfile() {
  try {
    const response = await axios.get(`${BASE_URL}/user`, {
      headers: {
        Cookie: `session=${session}`,
      },
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data.user;
      return data;
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      const error = await e.response?.data.msg;
      console.log(error);
      return;
    }
  }
}

export async function fetchUserPosts() {
  try {
    const response = await axios.get(`${BASE_URL}/posts/user`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data.posts;
      return data ?? [];
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      console.log(errorData);
      return;
    }
  }
}

export async function fetchUserRequests() {
  try {
    const response = await axios.get(`${BASE_URL}/requests/user`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data.requests;
      return data ?? [];
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      console.log(errorData);
      return;
    }
  }
}
