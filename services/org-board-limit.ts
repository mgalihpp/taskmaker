import { MAX_FREE_BOARDS } from "@/constants/boards";
import { absoluteUrl } from "@/lib/utils";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export async function manageAvailableCount(
  organizationId: string,
  action: "increment" | "decrement" | "check" | "get",
) {
  const { orgId } = await getOrgId(organizationId);

  if (!orgId) {
    const url = absoluteUrl("/select-organization");
    redirect(url);
  }

  let orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  if (!orgLimit && action !== "get") {
    orgLimit = await db.orgLimit.create({
      data: { orgId, count: 0 },
    });
  }

  if (action === "increment") {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: (orgLimit?.count ?? 0) + 1 },
    });
  } else if (action === "decrement") {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: Math.max((orgLimit?.count ?? 0) - 1, 0) },
    });
  } else if (action === "check") {
    return !orgLimit || orgLimit.count < MAX_FREE_BOARDS;
  } else if (action === "get") {
    return orgLimit?.count ?? 0;
  }
}

export async function getOrgId(orgId: string) {
  const org = await db.org.findFirst({
    where: { id: orgId },
  });

  return { orgId: org?.id };
}
