import { Separator } from "@/components/ui/separator";
import { Info } from "../_components/info";
import { OrganizationProfile } from "./_components/organization-profile";
import { checkSubscription } from "@/services/subscription";

export default async function SettingsPage({
  params,
}: {
  params: { organizationId: string };
}) {
  const { organizationId: orgId } = params;

  const isPro = await checkSubscription(orgId);

  return (
    <div className="w-full">
      <Info isPro={isPro} orgId={orgId} />
      <Separator className="my-4" />
      <OrganizationProfile orgId={orgId} />
    </div>
  );
}
