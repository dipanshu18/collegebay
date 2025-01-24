import { z } from "zod";

export const UserRequestSchema = z.object({
  image: z.string(),
  title: z.string().min(4, { message: "Title must be 4 characters long" }),
  description: z
    .string()
    .min(4, { message: "Description must be 4 characters long" }),
});
