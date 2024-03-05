"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { Org } from "@prisma/client";
import { fetcher } from "@/lib/fetcher";
import { Button } from "@/components/ui/button";
import { ArrowRight, Goal } from "lucide-react";
import { OrgList } from "./orglist";

export function UserOrganization({
  organizationId,
}: {
  organizationId?: string;
}) {
  const { data, isLoading } = useQuery<Org[]>({
    queryKey: ["org"],
    queryFn: () => fetcher(`/api/org`),
  });

  const org1 = data && data.find((org) => org.id === organizationId);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {org1 ? (
          <Button
            variant="ghost"
            className="flex w-full items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Goal /> {org1.name}
            </div>
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuGroup>
          {isLoading ? (
            <OrgList.Skeleton length={5} />
          ) : (
            data?.map((org) => (
              <DropdownMenuItem key={org.id}>
                <OrgList.Select {...org} />
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
