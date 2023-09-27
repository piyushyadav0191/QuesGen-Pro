"use client";

import * as React from "react";
import {
  CircuitBoard,
  FileQuestion,
  History,
  LayoutDashboard,
  Moon,
  Smile,
  Sun,
  User2,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import Link from "next/link";
import { useTheme } from "next-themes";

export function CommandPalatte() {
  const { setTheme } = useTheme();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded  px-1.5 font-mono text-xl font-medium ">
        <span className="text-xl">⌘</span>J
      </kbd>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search a page..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <Link href={"/dashboard"}>Dashboard</Link>
            </CommandItem>
            <CommandItem>
              <FileQuestion className="mr-2 h-4 w-4" />
              <Link href={"/mcq"}>MCQ / Open Ended</Link>
            </CommandItem>
            <CommandItem>
              <User2 className="mr-2 h-4 w-4" />
              <Link href={"/profile"}>Profile</Link>
            </CommandItem>
            <CommandItem>
              <History className="mr-2 h-4 w-4" />
              <Link href={"/history"}>History</Link>
            </CommandItem>
            <CommandItem>
              <CircuitBoard className="mr-2 h-4 w-4" />
              <Link href={"/leaderboard"}>Leaderboard</Link>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <Link href={"/relax-space"}>Relax space</Link>
            </CommandItem>
            <CommandItem>
              <Sun className="mr-2 h-4 w-4" />
              <span onClick={() => setTheme("light")}>Light mode</span>
            </CommandItem>
            <CommandItem>
              <Moon className="mr-2 h-4 w-4" />
              <span onClick={() => setTheme("dark")}>Dark mode</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
