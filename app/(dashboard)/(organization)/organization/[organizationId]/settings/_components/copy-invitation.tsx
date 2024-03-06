import { useState, useRef, RefObject } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { absoluteUrl, cn } from "@/lib/utils";

interface CopyInvitationProps {
  orgId: string;
}

export default function CopyInvitation({ orgId }: CopyInvitationProps) {
  const urlRef = useRef<HTMLInputElement>(null);
  const idRef = useRef<HTMLInputElement>(null);
  const [showUrlTooltip, setShowUrlTooltip] = useState(false);
  const [showIdTooltip, setShowIdTooltip] = useState(false);

  const handleCopy = (ref: RefObject<HTMLInputElement>) => {
    if (ref.current) {
      // Select the content of the input field
      ref.current.select();
      // Copy the selected content to the clipboard
      document.execCommand("copy");
      // Show the tooltip for the respective input field
      if (ref === idRef) {
        setShowIdTooltip(true);
        setShowUrlTooltip(false);
      } else {
        setShowUrlTooltip(true);
        setShowIdTooltip(false);
      }
      setTimeout(() => {
        setShowIdTooltip(false);
        setShowUrlTooltip(false);
      }, 2000);
    }
  };

  const url = absoluteUrl(`/organization/invite?orgId=${orgId}`);

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={url} className="text-lg lg:text-2xl">
        Invite user
      </Label>
      <div className="flex items-center gap-2">
        <input
          ref={urlRef}
          id={url}
          type="text"
          className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={url}
          readOnly
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => handleCopy(urlRef)} variant="outline">
                <span id="default-icon">
                  <svg
                    className={cn("h-4 w-4", {
                      hidden: showUrlTooltip,
                    })}
                    viewBox="0 0 18 20"
                    fill="currentColor"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                  </svg>
                </span>
                <span
                  id="success-icon"
                  className={cn("hidden items-center gap-2", {
                    "inline-flex": showUrlTooltip,
                  })}
                >
                  <svg
                    className="h-4 w-4 text-neutral-900"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.2l-4.8-4.2L3 14.4l6 5.6L21 9l-1.2-1.4z" />
                  </svg>
                  <p className="text-neutral-900">Copied</p>
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-row items-center">
        <div className="h-0.5 flex-1 bg-neutral-200"></div>
        <p className="mx-4 text-sm text-neutral-400">or</p>
        <div className="h-0.5 flex-1 bg-neutral-200"></div>
      </div>

      <Label htmlFor="orgId" className="text-lg lg:text-2xl">
        Organization Id
      </Label>

      <div className="flex items-center gap-2">
        <input
          ref={idRef}
          id={orgId}
          type="text"
          className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          value={orgId}
          readOnly
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => handleCopy(idRef)} variant="outline">
                <span id="default-icon">
                  <svg
                    className={cn("h-4 w-4", {
                      hidden: showIdTooltip,
                    })}
                    viewBox="0 0 18 20"
                    fill="currentColor"
                  >
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                  </svg>
                </span>
                <span
                  id="success-icon"
                  className={cn("hidden items-center gap-2", {
                    "inline-flex": showIdTooltip,
                  })}
                >
                  <svg
                    className="h-4 w-4 text-neutral-900"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M9 16.2l-4.8-4.2L3 14.4l6 5.6L21 9l-1.2-1.4z" />
                  </svg>
                  <p className="text-neutral-900">Copied</p>
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copy to clipboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
