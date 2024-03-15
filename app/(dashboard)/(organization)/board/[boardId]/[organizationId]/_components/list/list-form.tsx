"use client";

import { useParams, useRouter } from "next/navigation";
import { useRef, ElementRef, useState } from "react";
import ListWrapper from "./list-wrapper";
import { Plus, X } from "lucide-react";
import { useAction } from "@/hooks/use-action";
import { createList } from "@/server/actions/create-list";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";

export const ListForm = () => {
  const router = useRouter();
  const { boardId, organizationId: orgId } = useParams();

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" created`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => toast.error(error),
  });

  const onkeydown = (e: KeyboardEvent) => {
    if (e.key === "Espace") {
      disableEditing();
    }
  };

  useEventListener("keydown", onkeydown);
  useOnClickOutside(formRef, disableEditing);

  const handleFormAction = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    const orgId = formData.get("orgId") as string;

    execute({
      title,
      boardId,
      orgId,
    });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={handleFormAction}
          ref={formRef}
          className="w-full space-y-4 rounded-md bg-background p-3 shadow-md"
        >
          <FormInput
            ref={inputRef}
            errors={fieldErrors}
            id="title"
            className="h-7 border-transparent px-2 py-1 text-sm font-medium transition 
                hover:border-input focus:border-input
                "
            placeholder="Enter list title..."
          />
          <input hidden value={boardId} name="boardId" readOnly />
          <input hidden value={orgId} name="orgId" readOnly />

          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="flex w-full items-center rounded-md 
        bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50 
        dark:bg-black/80 dark:hover:bg-black/50
        "
      >
        <Plus className="mr-2 h-4 w-4" />
        Add a list
      </button>
    </ListWrapper>
  );
};
