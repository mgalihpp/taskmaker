import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pathname = req.nextUrl.pathname;
    const boardId = pathname.split("/").pop();

    const session = await getServerAuthSession();

    const user = session?.user;

    if (!user) return NextResponse.json("Unauthorized", { status: 401 });

    const board = await db.board.findFirst({
      where: {
        id: boardId,
      },
      select: {
        title: true,
      },
    });

    return NextResponse.json(board);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
