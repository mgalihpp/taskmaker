import { checkSubscription } from "@/services/subscription";
import { Info } from "./_components/info";
import { Suspense } from "react";
import { BoardList } from "./_components/board-list";
import { Separator } from "@/components/ui/separator";

export default async function OrganizationPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const orgId = params.organizationId;

  const isPro = await checkSubscription(orgId);

  return (
    <div className="mb-20 w-full">
      <Info isPro={isPro} orgId={orgId} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList orgId={orgId} />
        </Suspense>
      </div>
    </div>
  );
}
