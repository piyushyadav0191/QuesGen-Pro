import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import SignInButton from "./SignInButton";
import UserAcountNav from "./UserAcountNav";
import { ModeToggle } from "./ThemeToggle";
import { prisma } from "@/lib/db";
import { CommandPalatte } from "./CommandPalatte";

const Navbar = async () => {
  const session = await getAuthSession();

  const userRole =
    !!session &&
    (await prisma?.user?.findUnique({
      where: { id: session?.user?.id },
      select: { role: true },
    }));

  return (
    <div className="fixed inset-x-0 top-0  bg-white dark:bg-gray-900   h-fit border-b border-zinc-300 py-2">
      <div className=" flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* logo */}
        <Link href={"/"} className="flex items-center gap-2">
          <p className="rounded-lg text-blue-700 border-2 border-r-8 border-b-8 border-blue-700 px-2 py-1 font-bold transition-all hover:-translate-y-[2px] md:block dark:border-black dark:bg-white">
            MCQ Platform
          </p>
        </Link>

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
