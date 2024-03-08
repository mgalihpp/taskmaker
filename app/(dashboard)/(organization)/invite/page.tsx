"use client";

import { Suspense } from "react";
import { InviteCard } from "./_components/invite-card";

export default function InvitePage() {
  return (
    <Suspense fallback={<InviteCard.Skeleton />}>
      <InviteCard />
    </Suspense>
  );
}
