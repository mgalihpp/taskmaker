import { z } from "zod";

export const CopyCard = z.object({
  orgId: z.string({
    required_error: "OrgId is missing",
    invalid_type_error: "OrgId is missing",
  }),
  id: z.string(),
  boardId: z.string(),
});
