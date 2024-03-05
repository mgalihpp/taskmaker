"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Org } from "@prisma/client";
import { Goal, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const OrgList = (org: Org) => {
  return (
    <Button
      key={org.id}
      variant="ghost"
      className="flex w-full items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10">
          <Image
            src={org.image}
            alt="org image"
            className="object-cover"
            fill
          />
        </div>

        {org.name}
      </div>
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
};

OrgList.Skeleton = function SkeletonOrgList({
  length = 1,
}: {
  length?: number;
}) {
  return Array.from({ length }, (_, index) => (
    <Skeleton className="h-10 w-full" key={index} />
  ));
};

OrgList.Select = function OrgListSelect(org: Org) {
  return (
    <Link
      key={org.id}
      href={`/organization/${org.id}`}
      className={buttonVariants({
        variant: "ghost",
        size: "sm",
        className: "flex w-full items-center justify-between",
      })}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-10 w-10">
          <Image
            src={org.image}
            alt="org image"
            className="object-cover"
            fill
          />
        </div>

        {org.name}
      </div>
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
};
