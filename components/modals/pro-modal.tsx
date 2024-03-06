"use client";

import { useProModal } from "@/store/use-pro-modal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/server/actions/stripe";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const ProModal = () => {
  const { isOpen, onClose, orgId } = useProModal();

  const router = useRouter();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      router.push(data);
    },
    onError: (error) => toast.error(error),
  });

  const handleClick = () => execute({ orgId: orgId as string });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md overflow-hidden p-0">
        <div className="relative flex aspect-video items-center justify-center">
          <Image src="/hero.svg" alt="hero" className="object-cover" fill />
        </div>

        <div className="mx-auto space-y-6 p-6 text-neutral-700">
          <h2 className="text-xl font-semibold">
            Upgrade to TaskMaker Pro Today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of TaskMaker
          </p>
          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button onClick={handleClick} className="w-full" disabled={isLoading}>
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
