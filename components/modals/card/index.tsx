"use client";

import { fetcher } from "@/lib/fetcher";
import { useCardModal } from "@/store/use-card-modal";
import { CardWithList } from "@/types";
import { AuditLog } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Header } from "./header";
import { Description } from "./description";
import { Activity } from "./activity";
import { Actions } from "./actions";

export const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal();
  const { organizationId: orgId } = useParams();

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id, orgId],
    enabled: !!id && !!orgId,
    queryFn: () => fetcher(`/api/cards/${id}/${orgId}`),
  });

  const { data: auditLogData } = useQuery<AuditLog[]>({
    queryKey: ["card-logs", id, orgId],
    enabled: !!id && !!orgId,
    queryFn: () => fetcher(`/api/cards/${id}/${orgId}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {!cardData ? <Header.Skeleton /> : <Header data={cardData} />}

        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {!cardData ? (
                <Description.Skeleton />
              ) : (
                <Description data={cardData} />
              )}
              {!auditLogData ? (
                <Activity.Skeleton />
              ) : (
                <Activity items={auditLogData} />
              )}
            </div>
          </div>
          {!cardData ? <Actions.Skeleton /> : <Actions data={cardData} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
