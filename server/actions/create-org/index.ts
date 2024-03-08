"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { getServerAuthSession } from "../../auth";
import { db } from "../../db";
import { InputType, ReturnType } from "./types";
import { CreateOrg } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const session = await getServerAuthSession();

  const user = session?.user;

  if (!user) {
    return {
      error: "Unauthorized",
    };
  }

  const { name, slugUrl, image } = data;

  const newOrg = await db.org.create({
    data: {
      name,
      image,
      slugUrl,
    },
  });

  const Org = await db.userOrganization.create({
    data: {
      user: {
        connect: {
          id: user.id,
        },
      },
      org: {
        connect: {
          id: newOrg.id,
        },
      },
    },
  });

  return { data: newOrg };
};

export const createOrg = createSafeAction(CreateOrg, handler);
