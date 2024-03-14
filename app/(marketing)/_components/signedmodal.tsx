"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { memo } from "react";
import { useLocalStorage } from "usehooks-ts";

const SignedModal = () => {
  const [orgHistory] = useLocalStorage("selected-org", {});

  return (
    <div className="flex flex-row items-center gap-x-4">
      <Link
        href={
          orgHistory ? `/organization/${orgHistory}` : "/select-organization"
        }
        className={buttonVariants({
          variant: "outline",
          size: "sm",
        })}
      >
        Dashboard
      </Link>

      <Button onClick={() => signOut()} size="sm" className="gap-x-2">
        <LogOut className="h-4 w-4" /> Logout
      </Button>
    </div>
  );
};

export default memo(SignedModal);
