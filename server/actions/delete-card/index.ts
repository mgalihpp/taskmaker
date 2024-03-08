"use server";

import { getServerAuthSession } from "@/server/auth";
import { InputType, ReturnType } from "./types";
import { db } from "@/server/db";
import { createAuditLog } from "@/services/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { DeleteCard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerAuthSession();

  const user = session?.user;

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const { orgId, id, boardId } = data;
  let card;

  try {
    card = await db.card.delete({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.DELETE,
      orgId,
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/board/${boardId}/${orgId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCard, handler);
