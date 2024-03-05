import React from "react";
import { Navbar } from "./_components/navbar";
import { QueryProvider } from "@/providers/QueryProvider";
import { Toaster } from "@/components/ui/sonner";

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
      <Toaster position="bottom-right" />
    </QueryProvider>
  );
}
