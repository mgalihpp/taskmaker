import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerAuthSession();

    if (!session?.user)
      return new NextResponse("Unauthorized", { status: 401 });

    const org = await db.userOrg.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        org: true,
      },
    });

    const orgs = org.map((item) => item.org);

    return NextResponse.json(orgs, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
