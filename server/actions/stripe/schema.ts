import { z } from "zod";

export const StripeRedirect = z.object({
  orgId: z.string({
    invalid_type_error: "OrgId is missing",
    required_error: "OrgId is missing",
  }),
});
