import { getServerAuthSession } from "@/server/auth";
import { DeleteEverythingInOrg } from "@/services/delete-everything-org";
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

    const res = await DeleteEverythingInOrg(orgId);

    if (res.error) return NextResponse.json("Bad Request", { status: 400 });

    return NextResponse.json("Organization has been deleted", { status: 204 });
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
