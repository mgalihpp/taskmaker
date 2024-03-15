import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { copyCard } from "@/server/actions/copy-card";
import { deleteCard } from "@/server/actions/delete-card";
import { useCardModal } from "@/store/use-card-modal";
import { CardWithList } from "@/types";
import { Copy, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const { onClose } = useCardModal();
  const { boardId, organizationId: orgId } = useParams();

  const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" has been copied`);
        onClose();
      },
      onError: (error) => toast.error(error),
    },
  );

  const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (data) => {
        toast.success(`Card "${data.title}" has been deleted`), onClose();
      },
      onError: (error) => toast.error(error),
    },
  );

  const onCopy = () => {
    executeCopyCard({
      id: data.id,
      boardId: boardId as string,
      orgId: orgId as string,
    });
  };

  const onDelete = () => {
    executeDeleteCard({
      id: data.id,
      boardId: boardId as string,
      orgId: orgId as string,
    });
  };

  return (
    <div className="mt-2 space-y-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        variant="outline"
        className="w-full justify-start"
        size="inline"
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        variant="destructive"
        className="w-full justify-start"
        size="inline"
      >
        <Trash className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="mt-2 space-y-2">
      <Skeleton className="h-4 w-20 bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
      <Skeleton className="h-8 w-full bg-neutral-200" />
    </div>
  );
};
