import { db } from "@/server/db";
import OrganizationCard from "./organization-card";

interface OrganizationProfileProps {
  orgId: string;
}

export const OrganizationProfile = async ({
  orgId,
}: OrganizationProfileProps) => {
  const userOrganization = await db.userOrganization.findMany({
    where: {
      orgId,
    },
    include: {
      user: true,
      org: true,
    },
  });

  // get org
  const [org] = userOrganization?.map(({ org }) => org);

  // get the users
  const users = userOrganization?.map(({ user }) => user);

  return (
    <div>
      <OrganizationCard users={users} orgId={org.id} />
    </div>
  );
};
