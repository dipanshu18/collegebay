import { z } from "zod";
import { fileValidationSchema } from "./auth";

export const UserRequestSchema = z.object({
  image: fileValidationSchema,
  title: z.string().min(4, { message: "Title must be 4 characters long" }),
  description: z
    .string()
    .min(4, { message: "Description must be 4 characters long" }),
});
