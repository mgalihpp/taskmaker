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
import { useLeaveModal } from "@/store/use-setting-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function LeaveModal() {
  const { orgId, isOpen, onClose } = useLeaveModal();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: LeaveOrgMutate, isPending: LeavePending } = useMutation({
    mutationKey: ["leave-org", orgId],
    mutationFn: async () => {
      const data = fetcher(`/api/org/${orgId}/leave`, {
        method: "POST",
      });

      return data;
    },
  });

  const handleLeaveOrg = () => {
    LeaveOrgMutate(undefined, {
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
          <AlertDialogTitle>Are you sure to leave?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This action will make you leave from
            this organization.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <Button onClick={handleLeaveOrg} disabled={LeavePending}>
            Yes, leave
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
