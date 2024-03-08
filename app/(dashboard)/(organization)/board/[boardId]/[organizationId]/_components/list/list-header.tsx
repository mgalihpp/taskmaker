import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { updateList } from "@/server/actions/update-list";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
  orgId: string;
}

export const ListHeader = ({ data, onAddCard, orgId }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      formRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"`);

      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => toast.error(error),
  });

  const handleFormAction = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    const orgId = formData.get("orgId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      title,
      id,
      boardId,
      orgId,
    });
  };

  return (
    <div className="flex items-start justify-between gap-x-2 p-2 text-sm font-semibold">
      {isEditing ? (
        <form
          action={handleFormAction}
          ref={formRef}
          className="flex-1 px-[2px]"
        >
          <input hidden id="id" name="id" value={data.id} readOnly />
          <input
            hidden
            id="boardId"
            name="boardId"
            value={data.boardId}
            readOnly
          />
          <input hidden id="orgId" name="orgId" value={orgId} readOnly />
          <FormInput
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            placeholder="Enter list title..."
            defaultValue={title}
            className="focus:boder-input h-7 truncate border-transparent bg-transparent px-[7px] 
                py-1 text-sm font-medium transition hover:border-input 
                focus:bg-white
                "
          />
          <button type="submit" hidden></button>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="h-7 w-full border-transparent px-2.5 py-1 
            text-sm font-medium
            "
        >
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} orgId={orgId} />
    </div>
  );
};
