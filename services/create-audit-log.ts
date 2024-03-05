import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
  orgId: string;
}

export const createAuditLog = async (props: Props) => {
  try {
    const { entityId, entityType, entityTitle, action, orgId } = props;

    const session = await getServerAuthSession();

    const user = session?.user;

    if (!user || !orgId) {
      throw new Error("User not found!");
    }

    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        entityType,
        entityTitle,
        action,
        userId: user.id,
        userImage: user.image!,
        userName: user.name!,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};
