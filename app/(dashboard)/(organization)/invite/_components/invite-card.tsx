"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { Loader2, XCircle, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const InviteCard = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  const orgId = searchParams.get("orgId");

  const router = useRouter();

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["join-org"],
    enabled: !!orgId,
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch(`/api/org/${orgId}/invite`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data);
        throw new Error();
      }

      return data;
    },
  });

  useEffect(() => {
    if (isSuccess && data) {
      router.replace(data);
    }
  }, [isSuccess, data, router]);

  return (
    <Card className="mx-auto flex w-full max-w-md flex-col items-center justify-center">
      {isLoading && (
        <CardHeader>
          <CardTitle>Joining organization</CardTitle>
          <p className="text-base font-normal text-neutral-400">
            please wait to continue to TaskMaker
          </p>
        </CardHeader>
      )}
      <CardContent className="mx-auto flex flex-col items-center justify-center space-y-2 pt-6">
        {isLoading ? (
          <>
            <Loader2 className="mx-auto h-10 w-10 animate-spin" />
          </>
        ) : isError ? (
          <>
            <XCircle className="h-10 w-10 stroke-red-500" />
            <p className="text-red-500">{error}</p>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-10 w-10" />
            <p className="font-medium">Successfully Join Organization!</p>
            <TypingDots />
          </>
        )}
      </CardContent>
    </Card>
  );
};

const TypingDots = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length < 3) {
          return prevDots + ".";
        } else {
          return "";
        }
      });
    }, 1000); // Adjust the typing speed here

    return () => clearInterval(interval);
  }, []);

  return <p className="text-xs">Redirecting{dots}</p>;
};

InviteCard.Skeleton = function InviteCardSkeleton() {
  return (
    <>
      <Skeleton className="h-48" />
    </>
  );
};
