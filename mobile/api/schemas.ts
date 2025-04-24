import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be minimum 4 characters long" }),
  description: z
    .string()
    .min(5, { message: "Description must be minimum 5 characters long" }),
  price: z.string(),
  images: z
    .array(z.string())
    .min(1, { message: "At least one image is required." })
    .max(4, { message: "You can upload a maximum of 4 images." }),
  category: z.string(),
});

export const CreateRequestSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be minimum 4 characters long" }),
  description: z
    .string()
    .min(5, { message: "Description must be minimum 5 characters long" }),
  image: z.string(),
});
