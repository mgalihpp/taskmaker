import { User } from "@prisma/client";
import Image from "next/image";

interface UserListProps {
  user: User;
}

export const UserList = ({ user }: UserListProps) => {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="relative h-12 w-12">
          <Image
            className="flex-none rounded-full bg-gray-50"
            src={user.image!}
            alt="user profile"
            fill
          />
        </div>
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-neutral-900 dark:text-neutral-100">
            {user.name}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-neutral-500">
            {user.email}
          </p>
        </div>
      </div>
    </li>
  );
};
