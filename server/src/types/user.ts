import { z } from "zod";
import { passwordPattern } from "./auth";

export const UpdateUserSchema = z.object({
  image: z
    .instanceof(Buffer)
    .refine((file) => file?.buffer.byteLength <= 5 * 1024 * 1024, {
      message: "File size should not exceed 5MB.",
    })
    .optional()
    .nullable(),
  name: z
    .string()
    .min(4, { message: "Name must be minimum 4 characters long" })
    .optional(),
  phoneNo: z.coerce
    .string()
    .refine((val) => /^\d{10}$/.test(val), {
      message: "Phone no. must be exactly 10 digits and contain only numbers",
    })
    .optional(),
  password: z
    .string()
    .min(6, { message: "Password must be minimum 6 characters long" })
    .max(10, { message: "Password must be maximum 10 characters long" })
    .regex(passwordPattern, {
      message:
        "Password must contain at least one uppercase('A-Z') letter, one lowercase('a-z') letter, one digit(0-9), and one special character",
    })
    .optional(),
});
