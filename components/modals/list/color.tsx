import { FormSubmit } from "@/components/form/form-submit";
import { FormTextarea } from "@/components/form/form-textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { updateCard } from "@/server/actions/update-card";
import { updateListColor } from "@/server/actions/update-list-color";
import { useListModal } from "@/store/use-list-modal";
import { CardWithList } from "@/types";
import { List } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface ColorProps {
  data: List;
}

type Color = {
  primary: string;
  secondary: string;
};

type CardColorTypes = {
  label: string;
  theme: Color;
};

export const Color = ({ data }: ColorProps) => {
  const { onClose } = useListModal();
  const queryClient = useQueryClient();
  const { boardId, organizationId: orgId } = useParams();

  const CARD_COLORS: CardColorTypes[] = [
    {
      label: "Yellow",
      theme: {
        primary: "bg-yellow-500",
        secondary: "text-neutral-900",
      },
    },
    {
      label: "Blue",
      theme: {
        primary: "bg-blue-500",
        secondary: "text-neutral-900",
      },
    },
    {
      label: "Purple",
      theme: {
        primary: "bg-purple-500",
        secondary: "text-neutral-200",
      },
    },
    {
      label: "Teal",
      theme: {
        primary: "bg-teal-500",
        secondary: "text-neutral-200",
      },
    },
    {
      label: "Gray",
      theme: {
        primary: "bg-gray-500",
        secondary: "text-neutral-200",
      },
    },
  ];

  const { execute } = useAction(updateListColor, {
    onSuccess: () => onClose(),
  });

  const handleColorChange = (color: Color) => {
    execute({
      orgId: orgId as string,
      boardId: boardId as string,
      id: data.id,
      primaryColor: color.primary,
      secondaryColor: color.secondary,
    });
  };

  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeft className="mt-0.5 h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700 dark:text-neutral-300">
          Select color
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {CARD_COLORS.map((color, index) => (
            <Button
              onClick={() => handleColorChange(color.theme)}
              type="button"
              variant="outline"
              size="icon"
              key={index}
              className="flex w-24 items-center gap-x-2 px-2"
            >
              <div
                className={`${color.theme.primary} relative flex h-4 w-4 shrink-0 overflow-hidden rounded-full`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full" />
              </div>
              <div>
                <span>{color.label}</span>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

Color.Skeleton = function ColorSkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  );
};
