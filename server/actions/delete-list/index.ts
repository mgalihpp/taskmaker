"use server"

import { getServerAuthSession } from "@/server/auth";
import { InputType, ReturnType } from "./types";
import { db } from "@/server/db";
import { createAuditLog } from "@/services/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerAuthSession();

  const user = session?.user;

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const { orgId, id, boardId } = data;
  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });

    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      entityType: ENTITY_TYPE.LIST,
      action: ACTION.DELETE,
      orgId,
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/board/${boardId}/${orgId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteList, handler);
