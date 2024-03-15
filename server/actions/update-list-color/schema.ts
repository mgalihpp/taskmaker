import { z } from "zod";

export const UpdateListColor = z.object({
  orgId: z.string({
    required_error: "OrgId is missing",
    invalid_type_error: "OrgId is missing",
  }),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  id: z.string(),
  boardId: z.string(),
});
