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
import { useAction } from "@/hooks/use-action";
import { fetcher } from "@/lib/fetcher";
import { createOrg } from "@/server/actions/create-org";
import { Org } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { OrgList } from "../../_components/orglist";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { generateRandomFilename } from "@/lib/utils";
import Image from "next/image";

export default function OrganizationPage() {
  const [page, setPage] = useState(0);

  const router = useRouter();

  const btnRef = useRef<HTMLButtonElement | null>(null);

  const [error, setError] = useState("");

  const { data, isLoading } = useQuery<Org[]>({
    queryKey: ["org"],
    queryFn: () => fetcher("/api/org"),
  });

  const {
    execute,
    isLoading: isPending,
    fieldErrors,
  } = useAction(createOrg, {
    onSuccess: (result) => router.push(`/organization/${result.id}`),
  });

  const { mutate, isPending: joinPending } = useMutation({
    mutationKey: ["join-org"],
    mutationFn: async () => {
      if (input.orgId === "") return setError("Please enter organization id");

      try {
        const res = await fetch(`/api/org/${input.orgId}/invite`, {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data);
          throw new Error();
        }

        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const [input, setInput] = useState({
    name: "",
    slugUrl: "",
    orgId: "",
  });

  console.log(input);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    const slugUrl = value.toLowerCase().replace(/\s+/g, "-"); // Use value instead of input.name

    setInput((prevOrg) => ({
      ...prevOrg,
      [name]: value,
      slugUrl: slugUrl,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const changeFile = e.target?.files?.[0];

    if (changeFile) {
      setImageFile(changeFile);
    }
  };

  const handleFormAction = async () => {
    try {
      if (btnRef.current) {
        btnRef.current.disabled = true;
      }

      if (imageFile) {
        const fileName = generateRandomFilename();

        const orgImageRef = ref(storage, `/taskmaker/org/image/${fileName}`);

        await uploadBytes(orgImageRef, imageFile);

        // this to get imageurl from firebase
        const imageUrl = await getDownloadURL(orgImageRef);

        execute({
          image: imageUrl,
          name: input.name,
          slugUrl: input.slugUrl,
        });
      } else {
        execute({
          image: "https://mgalihpp.site/logo.jpg",
          name: input.name,
          slugUrl: input.slugUrl,
        });
      }
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  const handleJoinOrganization = () => {
    mutate(undefined, {
      onSuccess: (data) => {
        router.push(data);
      },
    });
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
                <p className="text-sm">You doesn&apos;t have organization</p>
              ) : (
                data?.map((org) => <OrgList.Select {...org} key={org.id} />)
              )}
            </div>

            <div className="flex flex-row items-center">
              <div className="h-0.5 flex-1 bg-neutral-200"></div>
              <p className="mx-4 text-sm text-neutral-400">or</p>
              <div className="h-0.5 flex-1 bg-neutral-200"></div>
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-2">
              <Button
                type="button"
                className="w-full"
                variant="outline"
                onClick={() => setPage(1)}
              >
                Create a organization
              </Button>

              <Button
                type="button"
                className="w-full bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-500 hover:to-pink-500"
                onClick={() => setPage(2)}
              >
                Join organization
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : page === 1 ? (
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
                {imageFile ? (
                  <div className="relative h-10 w-10">
                    <Image
                      src={URL.createObjectURL(imageFile)}
                      alt="dumb image"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 bg-gray-800"></div>
                )}
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
                    onChange={handleFileChange}
                  />
                </div>
              </div>

              <div className="flex w-full flex-col space-y-3">
                <Label htmlFor="name">Organization name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="off"
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
                  value={input.name.toLowerCase().replace(/\s+/g, "-")}
                  readOnly
                  disabled
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
                ref={btnRef}
                disabled={
                  !imageFile || !input.name || !input.slugUrl || isPending
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
      ) : (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Join organization</CardTitle>
            <p className="text-base font-normal text-neutral-400">
              to continue to TaskMaker
            </p>
          </CardHeader>
          <CardContent className="w-full space-y-6">
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="orgId" className="text-start text-lg">
                Organization ID
              </Label>

              <Input
                id="orgId"
                name="orgId"
                placeholder="Enter organization Id"
                autoComplete="off"
                onChange={handleInputChange}
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
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
              ref={btnRef}
              onClick={() => handleJoinOrganization()}
              disabled={input.orgId.length < 10}
              className="text-sm font-bold uppercase"
              size="sm"
            >
              {joinPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="text-xs">Join organization</span>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
