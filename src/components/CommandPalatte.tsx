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
} from "@/components/ui/command";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
  };
  return (
    <>
      <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded  px-1.5 font-mono text-xl font-medium ">
        <span className="text-xl">⌘</span>J
      </kbd>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search a page..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <Link href={"/dashboard"}>
                <CommandItem onSelect={() => setOpen(false)}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </CommandItem>
              </Link>
              <Link href={"/mcq"}>
                <CommandItem onSelect={() => setOpen(false)}>
                  <FileQuestion className="mr-2 h-4 w-4" />
                  MCQ / Open Ended
                </CommandItem>
              </Link>
              <Link href={"/profile"}>
                <CommandItem onSelect={() => setOpen(false)}>
                  <User2 className="mr-2 h-4 w-4" />
                  Profile
                </CommandItem>
              </Link>
              <Link href={"/history"}>
                <CommandItem onSelect={() => setOpen(false)}>
                  <History className="mr-2 h-4 w-4" />
                  History
                </CommandItem>
              </Link>
              <Link href={"/leaderboard"}>
                <CommandItem onSelect={() => setOpen(false)}>
                  <CircuitBoard className="mr-2 h-4 w-4" />
                  Leaderboard
                </CommandItem>
              </Link>
              <Link href={"/relax-space"}>
                <CommandItem onSelect={() => setOpen(false)}>
                  <Smile className="mr-2 h-4 w-4" />
                  Relax space
                </CommandItem>
              </Link>
              <button onClick={() => setTheme("light")}>
                <CommandItem onSelect={() => setOpen(false)}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light mode
                </CommandItem>
              </button>
              <button onClick={() => setTheme("dark")}>
                <CommandItem onSelect={() => setOpen(false)}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark mode
                </CommandItem>
              </button>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </motion.div>
    </>
  );
}
