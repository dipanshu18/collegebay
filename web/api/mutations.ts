import {
  CreatePostSchema,
  CreateRequestSchema,
  LoginSchema,
  SignupSchema,
} from "@/types/zodSchema";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";

const BASE_URL = "http://localhost:5000/api/v1";

export async function signup(values: z.infer<typeof SignupSchema>) {
  try {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("name", values.name);
    formData.append("password", values.password);
    formData.append("college", values.college);
    formData.append("phoneNo", values.phoneNo);
    if (values.image) {
      formData.append("image", values.image);
    }

    const response = await axios.post(`${BASE_URL}/auth/signup`, formData, {
      withCredentials: true,
    });

    if (response.status === 201) {
      const data = response.data;
      toast.success(data.msg);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data.msg;
      if (errorData) {
        if (typeof errorData === "object") {
          Object.entries(errorData).forEach(async ([field, message]) => {
            toast.error(`${field}: ${message}`);
          });
        } else {
          toast.error(errorData);
        }
      }
    }
  }
}

export async function login(values: z.infer<typeof LoginSchema>) {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, values, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data;
      toast.success(data.msg);
      return;
    }
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      return toast.error(error.response?.data.msg);
    }
  }
}

export async function logout() {
  try {
    const response = await axios.post(
      `${BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    if (response.status === 200) {
      const data = await response.data;
      toast.success(data.msg);
      return;
    }
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError) {
      return toast.error(error.response?.data.msg);
    }
  }
}

export async function createPost(values: z.infer<typeof CreatePostSchema>) {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("price", values.price);
  if (values.images.length > 0) {
    values.images.forEach((file) => {
      formData.append("images", file);
    });
  }

  try {
    const response = await axios.post(`${BASE_URL}/posts`, formData, {
      withCredentials: true,
    });

    if (response.status === 201) {
      const data = await response.data.msg;
      toast.success(data);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data.msg;
      if (errorData) {
        if (typeof errorData === "object") {
          Object.entries(errorData).forEach(async ([field, message]) => {
            toast.error(`${field}: ${message}`);
          });
        }
      }
    }
  }
}

export async function createRequest(
  values: z.infer<typeof CreateRequestSchema>
) {
  try {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    if (values.image) {
      formData.append("image", values.image);
    }

    const response = await axios.post(`${BASE_URL}/requests/create`, formData, {
      withCredentials: true,
    });

    if (response.status === 201) {
      const data = await response.data.msg;
      toast.success(data);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data.msg;
      if (errorData) {
        if (typeof errorData === "object") {
          Object.entries(errorData).forEach(async ([field, message]) => {
            toast.error(`${field}: ${message}`);
          });
        }
      }
    }
  }
}

export async function upVoteRequest(requestId: string) {
  try {
    await axios.post(
      `${BASE_URL}/requests/upvote/${requestId}`,
      {},
      { withCredentials: true }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.msg);
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
  try {
    const formData = new FormData();
    if (modifiedData) {
      formData.append("name", modifiedData.name as string);
      formData.append("password", modifiedData.password as string);
      formData.append("phoneNo", modifiedData.phoneNo as string);
      if (modifiedData.image) {
        formData.append("image", modifiedData.image);
      }
    } else {
      toast.error("Nothing to update");
      return;
    }

    const response = await axios.put(`${BASE_URL}/user`, formData, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data;

      toast.success(data.msg);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;

      return toast.error(errorData);
    }
  }
}

export async function deleteUser() {
  try {
    const response = await axios.delete(`${BASE_URL}/user`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data.msg;

      toast.success(data);
      return;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;

      toast.error(errorData);
    }
  }
}

export async function deleteRequest(requestId: string) {
  try {
    const response = await axios.delete(`${BASE_URL}/requests/${requestId}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data.msg;
      toast.success(data);
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response?.data.msg);
    }
  }
}

export async function postSold(postId: string) {
  try {
    const response = await axios.put(
      `${BASE_URL}/posts/${postId}/sold`,
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      const data = await response.data.msg;
      toast.success(data);
      return;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      toast.error(errorData);
    }
  }
}

export async function deletePost(postId: string) {
  try {
    const response = await axios.delete(`${BASE_URL}/posts/${postId}`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const data = await response.data.msg;
      toast.success(data);
      return;
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      toast.error(errorData);
    }
  }
}
