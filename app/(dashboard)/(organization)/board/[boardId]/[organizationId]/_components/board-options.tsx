"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";
import { deleteBoard } from "@/server/actions/delete-board";
import { MoreHorizontal, Trash, X } from "lucide-react";
import { memo } from "react";
import { toast } from "sonner";

interface BoardOptionsProps {
  id: string;
  orgId: string;
}

const BoardOptions = ({ id, orgId }: BoardOptionsProps) => {
  const { execute, isLoading } = useAction(deleteBoard, {
    onError: (error) => toast.error(error),
  });

  const onDelete = () => {
    execute({
      id,
      orgId,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="py-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600 dark:text-neutral-300">
          Board actions
        </div>

        <PopoverClose asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <Button
          variant="destructive"
          onClick={onDelete}
          disabled={isLoading}
          className="w-full items-center gap-2"
        >
          <Trash className="h-4 w-4 stroke-current group-hover:stroke-white" />
          Delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default memo(BoardOptions);
