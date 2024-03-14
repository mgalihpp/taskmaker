"use client";

import { Plus } from "lucide-react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/user-avatar";
import { FormPopover } from "@/components/form/form-popover";
import { memo, useEffect } from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { useLocalStorage } from "usehooks-ts";
import { useParams } from "next/navigation";

const Navbar = () => {
  const { organizationId: orgId } = useParams();

  const [orgHistory, setOrgHistory] = useLocalStorage("selected-org", orgId);

  useEffect(() => {
    if (orgId) {
      setOrgHistory(orgId);
    }
  }, [orgId, setOrgHistory]);

  return (
    <nav className="fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm">
      <MobileSidebar />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo history={orgHistory as string} />
        </div>
        <FormPopover align="start" side="bottom" sideOffset={18}>
          <Button
            size="sm"
            className="hidden h-auto rounded-sm px-2  py-1.5 md:block"
          >
            Create
          </Button>
        </FormPopover>
        <FormPopover>
          <Button size="sm" className="block rounded-sm md:hidden">
            <Plus className="h-4 w-4" />
          </Button>
        </FormPopover>
      </div>
      <div className="ml-auto flex items-center gap-x-2">
        <ModeToggle />
        <UserNav />
      </div>
    </nav>
  );
};

export default memo(Navbar);
