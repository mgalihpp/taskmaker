import { checkSubscription } from "@/services/subscription";
import { Info } from "../_components/info";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { ActivityList } from "./_components/activity-list";

export default async function ActivityPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const { organizationId: orgId } = params;

  const isPro = await checkSubscription(orgId);

  return (
    <div className="w-full">
      <Info isPro={isPro} orgId={orgId} />
      <Separator className="my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList orgId={orgId} />
      </Suspense>
    </div>
  );
}
