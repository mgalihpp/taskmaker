import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { ENTITY_TYPE } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const segments = pathname.split("/").filter(Boolean); // Remove empty segments

    // The second segment is the API, so we skip it
    const [cardId, orgId] = segments.slice(2);

    const session = await getServerAuthSession();

    const user = session?.user;

    if (!user) return NextResponse.json("Unauthoried", { status: 401 });

    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(auditLogs);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
