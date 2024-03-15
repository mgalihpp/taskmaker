"use client";

import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/server/actions/update-board";
import { Board } from "@prisma/client";
import { ElementRef, memo, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
  orgId: string;
}

const BoardTitleForm = ({ data, orgId }: BoardTitleFormProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const { execute } = useAction(updateBoard, {
    onSuccess: () => {
      toast.success(`Board "${data.title}" updated!`);
      setTitle(data.title);
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

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

  const handleFormAction = (formData: FormData) => {
    const title = formData.get("title") as string;

    execute({
      title,
      id: data.id,
      orgId,
    });
  };

  if (isEditing) {
    return (
      <form
        action={handleFormAction}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="border-none bg-transparent px-[7px] py-1 text-lg font-bold 
        focus-visible:outline-none focus-visible:ring-transparent
        "
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="h-auto w-auto p-1 px-2 text-lg font-bold"
    >
      {title}
    </Button>
  );
};

export default memo(BoardTitleForm);
