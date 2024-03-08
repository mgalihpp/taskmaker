"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthModal } from "@/store/use-auth-modal";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { memo, useEffect, useState } from "react";

const AuthModal = () => {
  const [loadingStates, setLoadingStates] = useState({
    google: false,
    github: false,
  });
  const searchParams = useSearchParams();
  const { open, toggleOpen, set } = useAuthModal();

  const isNotAuthorized = searchParams.has("auth");
  const hasCallbackUrl = searchParams.get("callbackUrl");

  useEffect(() => {
    if (isNotAuthorized) {
      set({ open: true });
    }
  }, [isNotAuthorized, set]);

  const toggleGoogleLoading = (value: boolean) => {
    setLoadingStates((prevStates) => ({
      ...prevStates,
      google: value,
    }));
  };

  const toggleGitHubLoading = (value: boolean) => {
    setLoadingStates((prevStates) => ({
      ...prevStates,
      github: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={toggleOpen}>
      <DialogTrigger asChild>
        <Button>Login</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md space-y-2">
        <DialogHeader>
          <DialogTitle>
            <span>Sign in</span>
          </DialogTitle>
          <p className="text-base font-normal text-neutral-400">
            to continue to platform
          </p>
        </DialogHeader>

        <div className="w-full space-y-2">
          <Button
            className="w-full items-center gap-x-4"
            variant="outline"
            onClick={() => {
              toggleGoogleLoading(true);
              signIn("google", {
                callbackUrl: hasCallbackUrl ? hasCallbackUrl : "/select-organization",
              }).then((result) => {
                if (result?.ok) {
                  toggleGoogleLoading(false);
                } else {
                  toggleGoogleLoading(false);
                }
              });
            }}
            disabled={loadingStates["google"]}
          >
            {loadingStates["google"] ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <GoogleLogo /> <span>Continue with Google</span>
              </>
            )}
          </Button>
          <Button
            className="w-full items-center gap-x-4"
            variant="outline"
            onClick={() => {
              toggleGitHubLoading(true);
              signIn("github", {
                callbackUrl: hasCallbackUrl ? hasCallbackUrl : "/select-organization",
              }).then((result) => {
                if (result?.ok) {
                  toggleGitHubLoading(false);
                } else {
                  toggleGitHubLoading(false);
                }
              });
            }}
            disabled={loadingStates["github"]}
          >
            {loadingStates["github"] ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <GithubLogo /> <span>Continue with Github</span>
              </>
            )}
          </Button>
        </div>
        <DialogFooter>
          <span className="text-xs text-neutral-700 ">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline">
              Privacy Policy
            </Link>{" "}
            .
          </span>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const GoogleLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="0.98em"
      height="1em"
      viewBox="0 0 256 262"
    >
      <path
        fill="#4285f4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      ></path>
      <path
        fill="#34a853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      ></path>
      <path
        fill="#fbbc05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
      ></path>
      <path
        fill="#eb4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      ></path>
    </svg>
  );
};

const GithubLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="0.98em"
      height="1em"
      viewBox="0 0 30 30"
    >
      <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
    </svg>
  );
};

export default memo(AuthModal);
