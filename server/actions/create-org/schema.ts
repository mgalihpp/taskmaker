import { z } from "zod";

export const CreateOrg = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name is required",
    })
    .min(3, {
      message: "Name is too short.",
    }),
  slugUrl: z
    .string({
      required_error: "Slug is required",
      invalid_type_error: "Slug is required",
    })
    .min(1, {
      message: "Slug is too short.",
    }),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image is required",
  }),
});
