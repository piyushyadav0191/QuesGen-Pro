import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import SignInButton from "./SignInButton";
import UserAcountNav from "./UserAcountNav";
import { ModeToggle } from "./ThemeToggle";
import { prisma } from "@/lib/db";
import { CommandPalatte } from "./CommandPalatte";
import Image from "next/image";
import Logo from "./Logo";

const Navbar = async () => {
  const session = await getAuthSession();

  const userRole =
    !!session &&
    (await prisma?.user?.findUnique({
      where: { id: session?.user?.id },
      select: { role: true },
    }));

  return (
    <div className="fixed inset-x-0 top-0  bg-white dark:bg-gray-900   h-16 border-b border-zinc-300 py-2 mb-3">
      <div className=" flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* logo */}
        <Logo />

        <ModeToggle className="mr-2" />
        <div className="flex items-center bg-white dark:bg-gray-900">
          {session?.user ? (
            <>
              <span className="mr-4 p-2">
                <CommandPalatte />
              </span>
              <UserAcountNav
                user={session.user}
                // @ts-ignore
                userRole={userRole}
              />
            </>
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
