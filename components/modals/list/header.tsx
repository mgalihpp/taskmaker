import { FormInput } from "@/components/form/form-input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/use-action";
import { updateList } from "@/server/actions/update-list";
import { List } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "lucide-react";
import { useParams } from "next/navigation";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface HeaderProps {
  data: List;
}

export const Header = ({ data }: HeaderProps) => {
  const queryClient = useQueryClient();
  const { boardId, organizationId: orgId } = useParams();

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      setTitle(data.title);

      queryClient.invalidateQueries({
        queryKey: ["list", data.id],
      });

      queryClient.invalidateQueries({
        queryKey: ["list-logs", data.id],
      });

      toast.success(`Renamed to "${data.title}"`);
    },
    onError: (error) => toast.error(error),
  });

  const inputRef = useRef<ElementRef<"input">>(null);

  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const handleFormAction = (formData: FormData) => {
    const title = formData.get("title") as string;

    if (title === data.title) {
      return;
    }

    execute({
      id: data.id,
      title,
      boardId: boardId as string,
      orgId: orgId as string,
    });
  };

  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <Layout className="mt-1 h-5 w-5 text-neutral-700 dark:text-neutral-300" />
      <div className="w-full">
        <form action={handleFormAction}>
          <FormInput
            id="title"
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className="relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent 
                    bg-transparent px-1 text-xl font-semibold text-neutral-700 focus-visible:border-input focus-visible:bg-white dark:text-neutral-300
                    "
          />
        </form>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="mb-6 flex items-start gap-x-3">
      <Skeleton className="mt-1 h-6 w-6 bg-neutral-200" />
      <div>
        <Skeleton className="mb-1 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-4 w-12 bg-neutral-200" />
      </div>
    </div>
  );
};
