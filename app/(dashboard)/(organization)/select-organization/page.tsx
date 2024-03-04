"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAction } from "@/hooks/use-action2";
import { fetcher } from "@/lib/fetcher";
import { createOrg } from "@/server/actions/create-org";
import { Org } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { OrgList } from "../../_components/orglist";

export default function OrganizationPage() {
  const [page, setPage] = useState(0);

  const ref = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  const { data, isLoading } = useQuery<Org[]>({
    queryKey: ["org"],
    queryFn: () => fetcher("/api/org"),
  });

  const { execute, isPending, fieldErrors } = useAction(createOrg, {
    onSuccess: (result) => router.push(`/organization/${result.orgId}`),
  });

  const [input, setInput] = useState({
    image: "",
    name: "",
    slugUrl: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setInput((prevOrg) => ({
      ...prevOrg,
      [name]: value,
    }));
  };

  const handleFormAction = () => {
    execute(input);
  };

  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      {page === 0 ? (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Select an organization</CardTitle>
            <p className="text-base font-normal text-neutral-400">
              to continue to TaskMaker
            </p>
          </CardHeader>
          <CardContent className="w-full space-y-4">
            <div className="flex w-full flex-col items-center gap-y-2">
              {isLoading ? (
                <OrgList.Skeleton length={5} />
              ) : data?.length === 0 ? (
                <p className="text-sm">You doen&apos;st have organization</p>
              ) : (
                data?.map((org) => <OrgList.Select {...org} key={org.id} />)
              )}
            </div>

            <div className="flex flex-row items-center">
              <div className="h-0.5 flex-1 bg-neutral-200"></div>
              <p className="mx-4 text-sm text-neutral-400">or</p>
              <div className="h-0.5 flex-1 bg-neutral-200"></div>
            </div>

            <div className="flex w-full items-center justify-center">
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={() => setPage(1)}
              >
                Create a organization
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create organization</CardTitle>
            <p className="text-base font-normal text-neutral-400">
              to continue to TaskMaker
            </p>
          </CardHeader>
          <form action={handleFormAction}>
            <CardContent className="w-full space-y-6">
              <div className="flex w-full flex-row items-center gap-x-2">
                <div className="h-10 w-10 bg-gray-800"></div>
                <div className="flex flex-col items-center justify-center gap-2">
                  <Label>Profile image</Label>
                  <Label
                    htmlFor="image"
                    className="cursor-pointer text-blue-500"
                  >
                    Upload Image
                  </Label>
                  <Input
                    id="image"
                    name="image"
                    type="file"
                    className="hidden"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex w-full flex-col space-y-3">
                <Label htmlFor="name">Organization name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleInputChange}
                />
                {fieldErrors?.name && (
                  <p className="text-xs text-red-500">{fieldErrors.name}</p>
                )}

                <Label htmlFor="slugUrl">Slug url</Label>
                <Input
                  id="slugUrl"
                  name="slugUrl"
                  type="text"
                  onChange={handleInputChange}
                />
                {fieldErrors?.slugUrl && (
                  <p className="text-xs text-red-500">{fieldErrors.slugUrl}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPage(0)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  !input.image || !input.name || !input.slugUrl || isPending
                }
                className="text-sm font-bold uppercase"
                size="sm"
              >
                {isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span className="text-xs">Create organization</span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
}
