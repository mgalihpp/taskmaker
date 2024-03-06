import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const orgId = pathname.split("/").pop();

    const session = await getServerAuthSession();

    if (!session?.user)
      return new NextResponse("Unauthorized", { status: 401 });

    const userOrg = await db.userOrg.findFirst({
      where: {
        userId: session.user.id,
        orgId: orgId as string,
      },
      include: {
        org: true,
      },
    });

    const org = userOrg?.org;

    return NextResponse.json(org, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
