import { startCase } from "lodash";

import { db } from "@/server/db";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";
import { absoluteUrl } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { organizationId: string };
}) {
  const { organizationId: orgId } = params;

  const org = await db.org.findUnique({
    where: {
      id: orgId,
    },
  });

  return {
    title: startCase(org?.slugUrl || "organization"),
  };
}

export default async function OrganizationIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { organizationId: string };
}) {
  const session = await getServerAuthSession();
  const { organizationId: orgId } = params;
  const user = session?.user;

  if (!user) {
    return redirect(absoluteUrl("/?callback=not_authorized"));
  }

  const userOrg = await db.userOrganization.findUnique({
    where: {
      userId_orgId: {
        userId: user.id,
        orgId: orgId,
      },
    },
  });

  if (!userOrg) {
    return redirect("/select-organization");
  }

  return <>{children}</>;
}
