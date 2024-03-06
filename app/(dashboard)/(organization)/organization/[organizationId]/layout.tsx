import { startCase } from "lodash";

import { db } from "@/server/db";

export async function generateMetadata({
  params,
}: {
  params: { organizationId: string };
}) {
  const org = await db.org.findFirst({
    where: {
      id: params.organizationId,
    },
  });

  return {
    title: startCase(org?.slugUrl || "organization"),
  };
}

export default function OrganizationIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <OrgControl /> */}
      {children}
    </>
  );
}
