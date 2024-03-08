"use client";

import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { createCard } from "@/server/actions/create-card";
import { Plus, X } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listId: string;
  enableEditing: () => void;
  disableEditing: () => void;
  isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, enableEditing, disableEditing, isEditing }, ref) => {
    const { boardId, organizationId: orgId } = useParams();

    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCard, {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" created`);
        formRef.current?.reset();
      },
      onError: (error) => toast.error(error),
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        disableEditing();
      }
    };

    useOnClickOutside(formRef, disableEditing);
    useEventListener("keydown", onKeyDown);

    const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e,
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    const handleFormAction = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = formData.get("boardId") as string;
      const orgId = formData.get("orgId") as string;

      execute({
        title,
        listId,
        boardId,
        orgId,
      });
    };

    if (isEditing) {
      return (
        <form
          ref={formRef}
          action={handleFormAction}
          className="mt-1 space-y-4 px-1 py-0.5"
        >
          <FormTextarea
            id="title"
            onKeyDown={onTextAreaKeyDown}
            ref={ref}
            placeholder="Enter a title for this card..."
            errors={fieldErrors}
          />
          <input hidden id="listId" name="listId" value={listId} readOnly />
          <input hidden id="boardId" name="boardId" value={boardId} readOnly />
          <input hidden id="orgId" name="orgId" value={orgId} readOnly />

          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>

            <Button onClick={disableEditing} size="sm" variant="ghost">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="px-2 pt-2">
        <Button
          onClick={enableEditing}
          className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
          size="sm"
          variant="ghost"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Card
        </Button>
      </div>
    );
  },
);

CardForm.displayName = "CardForm";
