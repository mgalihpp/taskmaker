import React from "react";

export default async function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex h-dvh items-center justify-center">
      {children}
    </div>
  );
}
