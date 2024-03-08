"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { copyList } from "@/server/actions/copy-list";
import { deleteList } from "@/server/actions/delete-list";
import { List } from "@prisma/client";
import { MoreHorizontal, Trash, X } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
  orgId: string;
}

export const ListOptions = ({ data, onAddCard, orgId }: ListOptionsProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);

  const { execute: executeDeleteList } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error) => toast.error(error),
  });

  const { execute: executeCopyList } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied`);
      closeRef.current?.click();
    },
    onError: (error) => toast.error(error),
  });

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    const orgId = formData.get("orgId") as string;

    executeCopyList({
      id,
      boardId,
      orgId,
    });
  };

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    const orgId = formData.get("orgId") as string;

    executeDeleteList({
      id,
      boardId,
      orgId,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="py-3" side="bottom" align="start">
        <div className="pb-4 text-center text-sm font-medium text-neutral-600">
          List actions
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            className="absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <Button
          className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          onClick={onAddCard}
          variant="ghost"
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} readOnly />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            readOnly
          />
          <input hidden name="orgId" id="orgId" value={orgId} readOnly />
          <FormSubmit
            variant="ghost"
            className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          >
            Copy list...
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} readOnly />
          <input
            hidden
            name="boardId"
            id="boardId"
            value={data.boardId}
            readOnly
          />
          <input hidden name="orgId" id="orgId" value={orgId} readOnly />
          <FormSubmit
            variant="ghost"
            className="group h-auto w-full items-center justify-start gap-4 
          border border-red-500 bg-transparent p-2 px-5 text-sm 
          font-normal text-red-500 hover:bg-red-500 hover:text-white"
          >
            <Trash className="h-4 w-4 stroke-current group-hover:stroke-white" />
            Delete this list
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
