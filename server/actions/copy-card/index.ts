"use server";

import { getServerAuthSession } from "@/server/auth";
import { InputType, ReturnType } from "./types";
import { db } from "@/server/db";
import { createAuditLog } from "@/services/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { CopyCard } from "./schema";

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
    const copyCard = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!copyCard) {
      return { error: "Card not found" };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId: copyCard.listId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title: `${copyCard.title} - Copy`,
        description: copyCard.description,
        order: newOrder,
        listId: copyCard.listId,
      },
    });

    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
      orgId,
    });
  } catch (error) {
    return {
      error: "Failed to copy.",
    };
  }

  revalidatePath(`/board/${boardId}/${orgId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);
