import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

const DAY_IN_MS = 86_400_000;

export async function checkSubscription(orgId: string) {
  const session = await getServerAuthSession();

  const user = session?.user;

  if (!user) {
    throw new Error("User not found!");
  }

  const orgSubscription = await db.orgSubscription.findUnique({
    where: {
      orgId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });

  if (!orgSubscription) {
    return false;
  }

  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
}
