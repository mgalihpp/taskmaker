import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const parts = pathname.split("/");

    const session = await getServerAuthSession();

    const user = session?.user;

    if (!user) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const orgId = parts[parts.length - 2];

    const org = await db.org.findFirst({
      where: {
        id: orgId,
      },
    });

    if (!org)
      return NextResponse.json("Organization ID is not found", {
        status: 404,
      });

    //check if user has join organization

    const isUserExitsInOrg = await db.userOrganization.findUnique({
      where: {
        userId_orgId: {
          orgId: org.id,
          userId: user.id,
        },
      },
    });

    if (isUserExitsInOrg)
      return NextResponse.json("User already exits in organization", {
        status: 400,
      });

    // connect the user to organization
    await db.userOrganization.create({
      data: {
        orgId: org.id,
        userId: user.id,
      },
    });

    const callbackUrl = `/organization/${orgId}`;

    return NextResponse.json(callbackUrl, { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
