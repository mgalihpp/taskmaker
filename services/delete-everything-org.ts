import { getStorageRefFromDownloadURL } from "@/lib/utils";
import { db } from "@/server/db";
import { StorageReference, deleteObject } from "firebase/storage";

export async function DeleteEverythingInOrg(
  orgId: string,
): Promise<{ success?: boolean; error?: boolean | string }> {
  try {
    const org = await db.org.findUnique({
      where: {
        id: orgId,
      },
    });

    if (!org) {
      return { error: "Organization not found!" };
    }

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
    ]);

    const imageRef = getStorageRefFromDownloadURL(
      org.image,
    ) as StorageReference;

    deleteObject(imageRef);

    await db.org.delete({
      where: {
        id: orgId,
      },
    });

    return { success: true };
  } catch (error) {
    return { error: true };
  }
}
