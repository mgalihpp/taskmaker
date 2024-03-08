"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import { useDeleteModal } from "@/store/use-setting-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function DeleteModal() {
  const { orgId, isOpen, onClose } = useDeleteModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: DeleteOrgMutate, isPending: DeletePending } = useMutation({
    mutationKey: ["delete-org", orgId],
    mutationFn: async () => {
      const data = fetcher(`/api/org/${orgId}/delete`, {
        method: "POST",
      });
      return data;
    },
  });

  const handleDeleteOrg = () => {
    DeleteOrgMutate(undefined, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["org"],
        });
        onClose();

        router.replace(data as string);
      },
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This action will permanently delete
            organization and everything inside like subscription, board, and
            users.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button onClick={handleDeleteOrg} disabled={DeletePending}>
            Yes, delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
