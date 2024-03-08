"use server"

import { getServerAuthSession } from "@/server/auth";
import { InputType, ReturnType } from "./types";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerAuthSession();

  const user = session?.user;

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const { orgId, items, boardId } = data;
  let updatedCards;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      }),
    );

    updatedCards = await db.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder.",
    };
  }

  revalidatePath(`/board/${boardId}/${orgId}`);
  return { data: updatedCards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
