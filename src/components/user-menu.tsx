"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/src/redux/store/store";
import { signOut } from "@/src/redux/features/auth-slice";
import { useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Image from "next/image";
import { User } from "lucide-react";

const UserMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated || !user) return null;

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center space-x-2 p-2 border rounded-lg">
          {
            user.profilePic ? 
            <Image
              src={user.profilePic || "/default-avatar.png"}
              alt="Profile"
              width={36}
              height={36}
              className="w-9 h-9 rounded-full"
            /> :
            <User className="w-full rounded-full" /> 
          }
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="w-48 bg-white shadow-md rounded-lg border p-2 text-gray-900 animate-fadeIn"
          sideOffset={6}
        >
          <DropdownMenu.Item
            className="px-4 py-2 rounded-md"
          >
            {user.username}
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
            onSelect={() => router.push("/profile")}
          >
            Profile
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-md"
            onSelect={() => router.push("/settings")}
          >
            Settings
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />

          <DropdownMenu.Item
            className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer rounded-md"
            onSelect={handleSignOut}
          >
            Sign Out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default UserMenu;
