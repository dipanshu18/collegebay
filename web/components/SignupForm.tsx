"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { SignupSchema } from "@/types";
import Spinner from "./Spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      password: "",
      college: "Vidyalankar Institute of Technology, Mumbai",
      phoneNo: "",
      image: "",
    },
  });

  async function signup(values: z.infer<typeof SignupSchema>) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/signup",
        values,
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        const data = await response.data;

        toast(data.msg);

        router.replace("/home");
        router.refresh();
        return;
      }
    } catch (error) {
      console.log(error);

      if (error instanceof AxiosError) {
        return toast(error.response?.data.msg);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(signup)}
        className="md:w-full md:max-w-xl max-w-md md:mx-auto space-y-4 m-5 p-5 border rounded-md shadow"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your edu email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Phone No.</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="your phone no." {...field} />
                </FormControl>
                <FormDescription>
                  Please don{`'`}t include +91- or +91
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="college"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>College</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="your college" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vidyalankar Institute of Technology, Mumbai">
                        Vidyalankar Institute of Technology, Mumbai
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="profile">Profile image</FormLabel>
                <FormControl>
                  <Input id="profile" type="file" accept="image/*" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className="w-full flex items-center gap-2"
        >
          {form.formState.isSubmitting && <Spinner />}
          Signup
        </Button>
      </form>
    </Form>
  );
}
