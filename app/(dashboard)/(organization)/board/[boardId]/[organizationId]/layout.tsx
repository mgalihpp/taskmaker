import { db } from "@/server/db";
import { notFound } from "next/navigation";
import React from "react";
import BoardNavbar from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string; organizationId: string };
}) {
  const { boardId, organizationId: orgId } = params;

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  return {
    title: `${board?.title}` || "Board",
  };
}

export default async function BoardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string; organizationId: string };
}) {
  const { boardId, organizationId: orgId } = params;

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  if (!board) {
    return notFound();
  }

  return (
    <div
      className="relative h-dvh bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} orgId={orgId} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pt-28">{children}</main>
    </div>
  );
}
