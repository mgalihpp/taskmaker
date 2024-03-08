"use server";

import { getServerAuthSession } from "@/server/auth";
import { InputType, ReturnType } from "./types";
import { absoluteUrl } from "@/lib/utils";
import { db } from "@/server/db";
import { stripe } from "@/lib/stripe";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { StripeRedirect } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerAuthSession();

  const user = session?.user;
  const orgId = data.orgId;

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const success_url = absoluteUrl(`/organization/${orgId}/?success=true`);
  const settings_url = absoluteUrl(`/organization/${orgId}`);
  const cancel_url = absoluteUrl(`/organization/${orgId}/?cancel=true`);

  let url = "";

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settings_url,
      });

      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url,
        cancel_url,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.email!,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "TaskMaker Pro",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 99,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });

      url = stripeSession.url || "";
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong!",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);
