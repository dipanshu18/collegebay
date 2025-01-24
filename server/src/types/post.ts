import { z } from "zod";

export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be minimum 4 characters long" }),
  description: z
    .string()
    .min(5, { message: "Description must be minimum 5 characters long" }),
  price: z.string(),
  category: z.enum(["NOTES", "BOOKS", "EQUIPMENT", "ELECTRONICS", "FURNITURE"]),
  images: z
    .array(z.string())
    .min(1, { message: "At least one image is required." })
    .max(4, { message: "You can upload a maximum of 4 images." }),
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
    .array(z.string())
    .optional()
    .refine(
      (value) => {
        if (
          (value && value?.length < 1) ||
          value === undefined ||
          value === null
        )
          return true;

        return value.length >= 1 || value.length <= 5;
      },
      { message: "You can upload a maximum of 4 images." }
    ),
});
