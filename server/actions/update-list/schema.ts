import { z } from "zod";

export const UpdateList = z.object({
  orgId: z.string({
    required_error: "OrgId is missing",
    invalid_type_error: "OrgId is missing",
  }),
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(3, {
      message: "Title is too short",
    }),
  id: z.string(),
  boardId: z.string(),
});
