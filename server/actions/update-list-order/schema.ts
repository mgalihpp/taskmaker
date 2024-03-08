import { z } from "zod";

export const UpdateListOrder = z.object({
  orgId: z.string({
    required_error: "OrgId is missing",
    invalid_type_error: "OrgId is missing",
  }),
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),
  boardId: z.string(),
});
