import { z } from "zod";

// Custom file validation (e.g., checking file type and size)
const fileValidationSchema = z
  .instanceof(File, { message: "Please select a image" })
  .refine((file) => file?.type === "image/jpeg", {
    message: "Only JPEG images are allowed.",
  })
  .refine((file) => file?.size <= 5 * 1024 * 1024, {
    message: "File size should not exceed 5MB.",
  });

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid @vit.edu.in email" })
    .regex(/^[a-zA-Z]+\.[a-zA-Z]+@vit\.edu\.in$/, {
      message: "Email must be a valid registered @vit.edu.in",
    }),
  password: z.string(),
});

export const SignupSchema = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid @vit.edu.in email" })
    .regex(/^[a-zA-Z]+\.[a-zA-Z]+@vit\.edu\.in$/, {
      message: "Email must be a valid registered @vit.edu.in",
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
          "Password must contain at least one uppercase('A-Z') letter, one lowercase('a-z') letter, one digit(0-9), and one special character",
      }
    ),
  college: z
    .string()
    .min(5, { message: "College name must be minimum 5 characters long" }),
  phoneNo: z
    .string()
    .min(10, { message: "Phone no. must be minimum 10 digits" })
    .max(10, { message: "Phone no. must be maximum 10 digits" }),
  image: fileValidationSchema,
});

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be minimum 4 characters long" }),
  description: z
    .string()
    .min(5, { message: "Description must be minimum 5 characters long" }),
  price: z.string(),
  images: z
    .any()
    .refine((files) => files?.[0]?.size <= 300000, `Max image size is 3MB.`)
    .refine(
      (files) => ["image/jpeg"].includes(files?.[0]?.type),
      "Only .jpg, and .jpeg formats are supported."
    ),
});

export const CreateRequestSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be minimum 4 characters long" }),
  description: z
    .string()
    .min(5, { message: "Description must be minimum 5 characters long" }),
  image: z
    .any()
    .refine((file) => file?.size <= 300000, `Max image size is 3MB.`)
    .refine(
      (file) => ["image/jpeg"].includes(file?.type),
      "Only .jpg, and .jpeg formats are supported."
    ),
});

export const UpdateProfileSchema = z.object({
  name: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined || value === null) return true;
        return value.length >= 5;
      },
      {
        message: "Name must be a minimum of 5 characters long.",
      }
    ),
  password: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined || value === null) return true;
        return (
          value.length >= 6 &&
          value.length <= 10 &&
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/.test(
            value
          )
        );
      },
      {
        message:
          "Password must be between 6 and 10 characters long, and include one uppercase letter, one lowercase letter, one digit, and one special character.",
      }
    ),
  phoneNo: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined || value === null) return true;
        return /^\d{10}$/.test(value);
      },
      {
        message: "Phone number must be exactly 10 digits long.",
      }
    ),
  image: z.union([fileValidationSchema.optional(), z.string().optional()]),
});

export const UpdatePostSchema = z.object({
  title: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === undefined || value === null) return true;

        return value.length >= 4;
      },
      { message: "Title must be minimum 4 characters long" }
    ),
  description: z.string().refine(
    (value) => {
      if (value === undefined || value === null) return true;

      return value.length >= 5;
    },
    { message: "Description must be minimum 4 characters long" }
  ),
  price: z
    .string()
    .optional()
    .refine((value) => {
      if (value === undefined || value === null) return true;

      return value.length >= 1;
    }),
  images: z
    .any()
    .refine((files) => files?.[0]?.size <= 300000, `Max image size is 3MB.`)
    .refine(
      (files) => ["image/jpeg"].includes(files?.[0]?.type),
      "Only .jpg, and .jpeg formats are supported."
    ),
});
