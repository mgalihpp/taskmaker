"use client"

import { FormPopover } from "@/components/form/form-popover";
import { Hint } from "@/components/hint";
import { MAX_FREE_BOARDS } from "@/constants/boards";
import { useBreakpoints } from "@/hooks/use-media-query";
import { HelpCircle } from "lucide-react";

interface CreateBoardProps {
  isPro: boolean;
  availableCount: number;
}

export const CreateBoard = ({ isPro, availableCount }: CreateBoardProps) => {
  const { isXs } = useBreakpoints();

  return (
    <FormPopover sideOffset={10} side={isXs ? "bottom" : "right"}>
      <div
        role="button"
        className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 
            rounded-sm bg-muted transition hover:opacity-75
            "
      >
        <p className="text-sm">Create new board</p>
        <span className="text-xs">
          {isPro
            ? "Unlimited"
            : `${MAX_FREE_BOARDS - Number(availableCount)} remaining`}
        </span>
        <Hint
          sideOffset={40}
          description={`
                Free workspaces can have up to 5 open boards. For unlimited boards upgrade this 
                workspaces.
            `}
        >
          <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
        </Hint>
      </div>
    </FormPopover>
  );
};
