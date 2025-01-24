import { z } from "zod";

// Email pattern: matches "firstname.lastname@vit.edu.in"
const emailPattern = /^[a-zA-Z]+\.[a-zA-Z]+@vit\.edu\.in$/;

// Password pattern: at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and 6-10 characters long
export const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;

export const Signup = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid @vit.edu.in email" })
    .regex(emailPattern, {
      message: "Email must be a valid registered @vit.edu.in",
    }),
  name: z
    .string()
    .min(5, { message: "Name must be minimum 5 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be minimum 6 characters long" })
    .max(10, { message: "Password must be maximum 10 characters long" })
    .regex(passwordPattern, {
      message:
        "Password must contain at least one uppercase('A-Z') letter, one lowercase('a-z') letter, one digit(0-9), and one special character",
    }),
  college: z
    .string()
    .min(5, { message: "College name must be minimum 5 characters long" }),
  phoneNo: z.coerce.string().refine((val) => /^\d{10}$/.test(val), {
    message: "Phone no. must be exactly 10 digits and contain only numbers",
  }),
  image: z.string(),
});

export const Login = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid @vit.edu.in email" })
    .regex(emailPattern, {
      message: "Email must be a valid registered @vit.edu.in",
    }),
  password: z.string(),
});
