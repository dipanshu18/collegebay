import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid @vit.edu.in email" })
    .regex(/^[a-zA-Z]+\.[a-zA-Z]+@vit\.edu\.in$/, {
      message: "Email must be in the format firstname.lastname@vit.edu.in",
    }),
  password: z.string(),
});

export const SignupSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid @vit.edu.in email" })
    .regex(/^[a-zA-Z]+\.[a-zA-Z]+@vit\.edu\.in$/, {
      message: "Email must be in the format firstname.lastname@vit.edu.in",
    }),
  name: z
    .string()
    .min(5, { message: "Name must be minimum 5 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be minimum 6 characters long" })
    .max(10, { message: "Password must be maximum 10 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/,
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character",
      }
    ),
  college: z
    .string()
    .min(8, { message: "College name must be minimum 8 characters long" }),
  phoneNo: z
    .string()
    .min(10, { message: "Phone no. must be minimum 10 digits" })
    .max(10, { message: "Phone no. must be maximum 10 digits" }),
  image: z.string(),
});
