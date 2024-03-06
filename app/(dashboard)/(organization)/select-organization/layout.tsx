import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Select Organization",
};

export default function SelectOrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
