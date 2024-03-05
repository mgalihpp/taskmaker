import { z } from "zod";
import { Org } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateOrg } from "./schema";

export type InputType = z.infer<typeof CreateOrg>;
export type ReturnType = ActionState<InputType, Org>;
