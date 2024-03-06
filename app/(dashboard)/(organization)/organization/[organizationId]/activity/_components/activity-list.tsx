import { ActivityItem } from "@/components/activity-item";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

interface ActivityListProps {
  orgId: string;
}

export const ActivityList = async ({ orgId }: ActivityListProps) => {
  if (!orgId) {
    redirect("/select-organization");
  }

  const auditsLog = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ol className="mt-4 space-y-4">
      <p className="hidden text-center text-xs text-muted-foreground last:block">
        No Activity found inside this organization
      </p>
      {auditsLog.map((log) => (
        <ActivityItem data={log} key={log.id} />
      ))}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="mt-4 space-y-4">
      <Skeleton className="h-14 w-[80%]" />
      <Skeleton className="h-14 w-[50%]" />
      <Skeleton className="h-14 w-[70%]" />
      <Skeleton className="h-14 w-[80%]" />
      <Skeleton className="h-14 w-[75%]" />
    </ol>
  );
};
