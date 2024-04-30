"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BookIcon,
  Hand,
  LayoutDashboardIcon,
  Menu,
  SmileIcon,
  TrophyIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="top-96 left-0 fixed z-auto bg-white dark:bg-black border border-gray-700 rounded-lg p-6">
        <Hand className="rotate-90" size={30} />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <nav className="flex flex-1 flex-col space-y-1 overflow-y-auto px-4 py-6">
          <SheetClose asChild>
          <Link
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            href="/dashboard"
          >
            <LayoutDashboardIcon className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          </SheetClose>
          <Separator />
          <SheetClose asChild>
          <Link
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            href="/leaderboard"
          >
            <TrophyIcon className="h-5 w-5" />
            <span>Leaderboard</span>
          </Link>
          </SheetClose>
          <Separator />
          <SheetClose asChild>
          <Link
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            href="/career-advice"
          >
            <BookIcon className="h-5 w-5" />
            <span>Career Advice</span>
          </Link>
          </SheetClose>
          <Separator />
          <SheetClose asChild>
          <Link
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            href="/relax-space"
          >
            <SmileIcon className="h-5 w-5" />
            <span>Relax Space</span>
          </Link>
          </SheetClose>
          <Separator />
          <SheetClose asChild>
          <Link
            className="flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
            href="/profile"
          >
            <UserIcon className="h-5 w-5" />
            <span>Profile</span>
          </Link>
          </SheetClose>
          <Separator />
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
