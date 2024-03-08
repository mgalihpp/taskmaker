"use server";

import { getServerAuthSession } from "@/server/auth";
import { InputType, ReturnType } from "./types";
import { db } from "@/server/db";
import { createAuditLog } from "@/services/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { CreateCard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerAuthSession();

  const user = session?.user;

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const { orgId, boardId, listId, title } = data;
  let card;

  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });

    if (!list) {
      return { error: "List not found" };
    }

    const lastCard = await db.card.findFirst({
      where: {
        listId,
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
        title,
        listId,
        order: newOrder,
      },
    });

    await createAuditLog({
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
      action: ACTION.CREATE,
      orgId,
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }
  revalidatePath(`/board/${boardId}/${orgId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCard, handler);
