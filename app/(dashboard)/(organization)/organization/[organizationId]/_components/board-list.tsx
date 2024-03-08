import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/server/db";
import { manageAvailableCount } from "@/services/org-board-limit";
import { checkSubscription } from "@/services/subscription";
import { Board } from "@prisma/client";
import { User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CreateBoard } from "./create-board-form";

interface BoardListProps {
  orgId: string;
}

async function getUserBoard(orgId: string): Promise<Board[]> {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const boards = await db.board.findMany({
          where: {
            orgId,
          },
          orderBy: {
            createdAt: "desc",
          },
        });
        resolve(boards);
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

export const BoardList = async ({ orgId }: BoardListProps) => {
  if (!orgId) {
    return redirect("/select-organization");
  }

  const boards = await getUserBoard(orgId);

  const availableCount = await manageAvailableCount(orgId, "get");
  const isPro = await checkSubscription(orgId);

  return (
    <div className="space-y-4">
      <div className="flex items-center text-lg font-semibold text-neutral-700">
        <User2 className="mr-2 h-6 w-6" />
        Your boards
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}/${orgId}`}
            className="group relative 
                aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700 bg-cover 
                bg-center bg-no-repeat p-2
                "
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40">
              <p className="relative truncate p-2 font-semibold text-white">
                {board.title}
              </p>
            </div>
          </Link>
        ))}
        <CreateBoard isPro={isPro} availableCount={Number(availableCount)} />
      </div>
    </div>
  );
};

BoardList.Skeleton = function SkeletonBoardList() {
  return (
    <div className="gird-cols-2 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
