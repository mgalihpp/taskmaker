"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserList } from "./user-list";
import { User } from "@prisma/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CopyInvitation from "./copy-invitation";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useDeleteModal, useLeaveModal } from "@/store/use-setting-modal";

interface OrganizationCardProps {
  users: User[];
  orgId: string;
}

export default function OrganizationCard({
  users,
  orgId,
}: OrganizationCardProps) {
  const [activeTab, setActiveTab] = useState<"users" | "settings">("users");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { onOpen: onLeaveOpen } = useLeaveModal();
  const { onOpen: onDeleteOpen } = useDeleteModal();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const changeFile = e.target?.files?.[0];

    if (changeFile) {
      setImageFile(changeFile);
    }
  };

  return (
    <Card className="h-full w-full rounded-md border">
      <CardContent className="flex h-full w-full flex-row gap-2 p-0">
        {/* sidebar */}
        <Tabs
          defaultValue="users"
          className="flex h-full w-full flex-col gap-2 p-0 lg:flex-row"
        >
          <TabsList className="flex h-auto w-full items-center justify-start rounded-none border bg-transparent px-4 py-8 md:flex-col lg:max-w-52">
            <TabsTrigger
              value="users"
              onClick={() => setActiveTab("users")}
              asChild
            >
              <Button variant="ghost" className="w-full">
                Users
              </Button>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              onClick={() => setActiveTab("settings")}
              asChild
            >
              <Button variant="ghost" className="w-full">
                Settings
              </Button>
            </TabsTrigger>
          </TabsList>

          {/* main content */}
          {activeTab === "users" ? (
            <TabsContent
              value="users"
              className="mt-0 flex h-full w-full flex-col px-4 py-8"
            >
              <h1 className="text-lg font-semibold lg:text-2xl">
                Manage Users
              </h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-300">
                View and manage organization users
              </p>

              <div className="mt-4">
                <Tabs defaultValue="users">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="invitations">Invitations</TabsTrigger>
                  </TabsList>
                  <TabsContent value="users" className="w-full">
                    <ul role="list" className="divide-y divide-gray-100">
                      {users.map((user) => (
                        <UserList user={user} key={user.id} />
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="invitations" className="w-full">
                    <CopyInvitation orgId={orgId} />
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          ) : (
            <TabsContent
              value="settings"
              className="mt-0 flex h-full w-full flex-col px-4 py-8"
            >
              <h1 className="text-lg font-semibold lg:text-2xl">Settings</h1>
              <p className="text-sm text-neutral-500 dark:text-neutral-300">
                Manage organization settings
              </p>
              <div className="mt-4">
                <div className="my-4">
                  <form action="">
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
                  </form>
                </div>

                <h2 className="text-base font-bold">Danger</h2>
                <Separator className="my-2" />

                <div className="flex flex-col items-center gap-4 md:flex-row">
                  <Button
                    onClick={() => onLeaveOpen(orgId)}
                    className="group gap-2 border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <X className="h-4 w-4 stroke-current group-hover:stroke-white" />
                    Leave organization
                  </Button>
                  <Button
                    onClick={() => onDeleteOpen(orgId)}
                    className="group gap-2 border border-red-500 bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
                  >
                    <X className="h-4 w-4 stroke-current group-hover:stroke-white" />
                    Delete organization
                  </Button>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}
