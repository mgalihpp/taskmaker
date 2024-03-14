import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import { memo } from "react";

const headingFont = localFont({
  src: "../public/fonts/font.woff2",
});

const Logo = ({ history }: { history?: string }) => {
  return (
    <Link href={history ? `/organization/${history}` : "/"}>
      <div className="hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
        <Image src="/logo.svg" alt="Logo" height={30} width={30} />
        <p
          className={cn(
            "py-auto text-lg text-neutral-700",
            headingFont.className,
          )}
        >
          TaskMaker
        </p>
      </div>
    </Link>
  );
};

export default memo(Logo);
