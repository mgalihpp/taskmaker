import { MAX_FREE_BOARDS } from "@/constants/boards";
import { db } from "@/server/db";

export async function manageAvailableCount(
  organizationId: string,
  action: "increment" | "decrement" | "check" | "get",
) {
  const { orgId } = await getOrgId(organizationId);

  if (!orgId) {
    throw new Error("Unauthorized");
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

// import { MAX_FREE_BOARDS } from "@/constants/boards";
// import { db } from "@/server/db";

// export async function getOrgId(orgId: string) {
//   const org = await db.org.findFirst({
//     where: {
//       id: orgId,
//     },
//   });

//   return { orgId: org?.id };
// }

// export async function incrementAvailableCount(organizationId: string) {
//   const { orgId } = await getOrgId(organizationId);

//   if (!orgId) {
//     throw new Error("Unauthorized");
//   }

//   const orgLimit = await db.orgLimit.findUnique({
//     where: { orgId },
//   });

//   if (orgLimit) {
//     await db.orgLimit.update({
//       where: { orgId },
//       data: { count: orgLimit.count + 1 },
//     });
//   } else {
//     await db.orgLimit.create({
//       data: { orgId, count: 1 },
//     });
//   }
// }

// export async function decreaseAvailableCount(organizationId: string) {
//   const { orgId } = await getOrgId(organizationId);

//   if (!orgId) {
//     throw new Error("Unauthorized");
//   }

//   const orgLimit = await db.orgLimit.findUnique({
//     where: { orgId },
//   });

//   if (orgLimit) {
//     await db.orgLimit.update({
//       where: { orgId },
//       data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
//     });
//   } else {
//     await db.orgLimit.create({
//       data: { orgId, count: 1 },
//     });
//   }
// }

// export async function hasAvailableCount(organizationId: string) {
//   const { orgId } = await getOrgId(organizationId);

//   if (!orgId) {
//     throw new Error("Unauthorized");
//   }

//   const orgLimit = await db.orgLimit.findUnique({
//     where: { orgId },
//   });

//   if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
//     return true;
//   } else {
//     return false;
//   }
// }

// export async function getAvailableCount(organizationId: string) {
//   const { orgId } = await getOrgId(organizationId);

//   if (!orgId) {
//     return 0;
//   }

//   const orgLimit = await db.orgLimit.findUnique({
//     where: { orgId },
//   });

//   if (!orgLimit) {
//     return 0;
//   }

//   return orgLimit.count;
// }
