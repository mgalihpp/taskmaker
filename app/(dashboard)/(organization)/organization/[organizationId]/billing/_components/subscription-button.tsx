"use client";

import { toast } from "sonner";

import { useAction } from "@/hooks/use-action";
import { Button } from "@/components/ui/button";
import { stripeRedirect } from "@/server/actions/stripe";
import { useProModal } from "@/store/use-pro-modal";
import { useRouter } from "next/navigation";

interface SubscriptionButtonProps {
  isPro: boolean;
  orgId: string;
}

export const SubscriptionButton = ({
  isPro,
  orgId,
}: SubscriptionButtonProps) => {
  const { onOpen, set } = useProModal();

  const router = useRouter();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      router.push(data);
    },
    onError: (error) => toast.error(error),
  });

  const handleClick = () => {
    set({ orgId });

    if (isPro) {
      execute({ orgId });
    } else {
      onOpen();
    }
  };

  return (
    <Button onClick={handleClick} disabled={isLoading}>
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
    </Button>
  );
};
