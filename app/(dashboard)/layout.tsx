import React from "react";
import { Navbar } from "./_components/navbar";
import { QueryProvider } from "@/providers/QueryProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <div className="h-full">
        <Navbar />
        {children}
      </div>
    </QueryProvider>
  );
}
