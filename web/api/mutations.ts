import { LoginSchema, SignupSchema } from "@/types/zodSchema";
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

export async function createPost() {
  try {
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      toast.error(errorData);
    }
  }
}

export async function createRequest() {
  try {
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      toast.error(errorData);
    }
  }
}

export async function upVoteRequest() {
  try {
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = await error.response?.data.msg;
      toast.error(errorData);
    }
  }
}
