"use server";

import { getServerAuthSession } from "@/server/auth";
import { InputType, ReturnType } from "./types";
import { checkSubscription } from "@/services/subscription";
import { db } from "@/server/db";
import { manageAvailableCount } from "@/services/org-board-limit";
import { createAuditLog } from "@/services/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerAuthSession();

  const user = session?.user;

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, orgId } = data;

  const isPro = await checkSubscription(orgId);

  let board;

  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isPro) {
      await manageAvailableCount(orgId, "decrement");
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
      orgId,
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
