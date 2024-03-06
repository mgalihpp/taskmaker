import { Separator } from "@/components/ui/separator";

import { SubscriptionButton } from "./_components/subscription-button";

import { Info } from "../_components/info";
import { checkSubscription } from "@/services/subscription";

export default async function BillingPage({
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
      <SubscriptionButton isPro={isPro} orgId={orgId} />
    </div>
  );
}
