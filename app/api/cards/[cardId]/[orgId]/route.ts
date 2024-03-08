import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
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

    const card = await db.card.findUnique({
      where: {
        id: cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
