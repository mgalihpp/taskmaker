"use client";

import { LeaveModal } from "@/components/modals/leave-modal";
import { CardModal } from "@/components/modals/card";
import { ProModal } from "@/components/modals/pro-modal";
import { useState, useEffect } from "react";
import { DeleteModal } from "@/components/modals/delete-modal";

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
      <ProModal />
      <LeaveModal />
      <DeleteModal />
    </>
  );
}
