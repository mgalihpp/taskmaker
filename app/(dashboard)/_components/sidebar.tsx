"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
// import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

import { NavItem, Organization } from "./nav-item";
import { useQuery } from "@tanstack/react-query";
import { Org } from "@prisma/client";
import { fetcher } from "@/lib/fetcher";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );

  const { data, isLoading: isLoadedOrg } = useQuery<Org[]>({
    queryKey: ["org"],
    queryFn: () => fetcher("/api/org"),
  });

  console.log(data);

  //   const {
  //     organization: activeOrganization,
  //     isLoaded: isLoadedOrg
  //   } = useOrganization();
  //   const {
  //     userMemberships,
  //     isLoaded: isLoadedOrgList
  //   } = useOrganizationList({
  //     userMemberships: {
  //       infinite: true,
  //     },
  //   });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    [],
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (isLoadedOrg) {
    return (
      <>
        <div className="mb-2 flex items-center justify-between">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="mb-1 flex items-center text-xs font-medium">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-organization">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {data &&
          data.map((organization) => (
            <NavItem
              key={organization.id}
              isActive={organization.id === organization.id}
              isExpanded={expanded[organization.id]}
              organization={organization as Organization}
              onExpand={onExpand}
            />
          ))}
      </Accordion>
    </>
  );
};
