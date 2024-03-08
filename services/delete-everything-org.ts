import { db } from "@/server/db";

export async function DeleteEverythingInOrg(
  orgId: string,
): Promise<{ success?: boolean; error?: boolean }> {
  try {
    await db.$transaction([
      db.userOrganization.deleteMany({
        where: { orgId },
      }),
      db.orgSubscription.deleteMany({
        where: { orgId },
      }),
      db.board.deleteMany({
        where: { orgId },
      }),
      db.orgLimit.deleteMany({
        where: { orgId },
      }),
      db.auditLog.deleteMany({
        where: {
          orgId,
        },
      }),
      db.org.delete({
        where: {
          id: orgId,
        },
      }),
    ]);
    console.log(
      `Deleted all related records for organization with ID: ${orgId}`,
    );

    return { success: true };
  } catch (error) {
    return { error: true };
  }
}
