import { db } from "@/server/db";
import { redirect } from "next/navigation";
import ListContainer from "./_components/list/list-container";

interface BoardPageProps {
  params: {
    boardId: string;
    organizationId: string;
  };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { boardId, organizationId: orgId } = params;

  if (!orgId) {
    redirect("/select-organization");
  }

  const lists = await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="h-full overflow-x-auto p-4">
      <ListContainer data={lists} boardId={boardId} orgId={orgId} />
    </div>
  );
}
