"use client";

import { fetcher } from "@/lib/fetcher";
import { useListModal } from "@/store/use-list-modal";
import { List } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Header } from "./header";
import { Color } from "./color";

export const ListModal = () => {
  const { id, isOpen, onClose } = useListModal();
  const { organizationId: orgId } = useParams();

  const { data: listData } = useQuery<List>({
    queryKey: ["list", id, orgId],
    enabled: !!id && !!orgId,
    queryFn: () => fetcher(`/api/lists/${id}/${orgId}`),
  });

  // const { data: auditLogData } = useQuery<AuditLog[]>({
  //   queryKey: ["card-logs", id, orgId],
  //   enabled: !!id && !!orgId,
  //   queryFn: () => fetcher(`/api/cards/${id}/${orgId}/logs`),
  // });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!listData ? <Header.Skeleton /> : <Header data={listData} />}

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!listData ? <Color.Skeleton /> : <Color data={listData} />}
              {/* {!auditLogData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogData} />
              )} */}
            </div>
          </div>
          {/* {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />} */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
