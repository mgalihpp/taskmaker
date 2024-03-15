import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const segments = pathname.split("/").filter(Boolean); // Remove empty segments

    // The second segment is the API, so we skip it
    const [listId, orgId] = segments.slice(2);

    const session = await getServerAuthSession();

    const user = session?.user;

    if (!user) return NextResponse.json("Unauthorized", { status: 401 });

    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });

    return NextResponse.json(list);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
