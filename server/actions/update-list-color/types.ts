import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateListColor } from "./schema";

export type InputType = z.infer<typeof UpdateListColor>;
export type ReturnType = ActionState<InputType, List>;
