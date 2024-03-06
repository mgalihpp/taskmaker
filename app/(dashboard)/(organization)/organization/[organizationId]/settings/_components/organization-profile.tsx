import { db } from "@/server/db";
import OrganizationCard from "./organization-card";

interface OrganizationProfileProps {
  orgId: string;
}

export const OrganizationProfile = async ({
  orgId,
}: OrganizationProfileProps) => {
  const usersOrg = await db.userOrg.findMany({
    where: {
      orgId,
    },
    include: {
      user: true,
      org: true,
    },
  });

  // get org
  const [org] = usersOrg?.map(({ org }) => org);

  // get the users
  const users = usersOrg?.map(({ user }) => user);

  return (
    <div>
      <OrganizationCard users={users} />
    </div>
  );
};
