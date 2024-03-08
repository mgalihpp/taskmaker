import { Board } from "@prisma/client";
import BoardTitleForm from "./board-title-form";
import BoardOptions from "./board-options";

interface BoardNavbarProps {
  data: Board;
  orgId: string;
}

export default async function BoardNavbar({ data, orgId }: BoardNavbarProps) {
  return (
    <div
      className="fixed top-14 z-[40] flex h-14 w-full items-center gap-x-4 
  bg-black/50 px-4 text-white
  "
    >
      <BoardTitleForm data={data} orgId={orgId} />
      <div className="ml-auto">
        <BoardOptions id={data.id} orgId={orgId} />
      </div>
    </div>
  );
}
