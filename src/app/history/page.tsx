import History from "@/components/History";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { getAuthSession } from "@/lib/nextauth";
import { cn } from "@/lib/utils";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div className="absolute  top-[20%] left-1/3 ">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between ">
            <CardTitle className="text-2xl font-bold mr-2 text-black dark:text-gray-300">
              History
            </CardTitle>
            <Link
              href={"/dashboard"}
              className={cn(buttonVariants(), "text-black dark:text-gray-200")}
            >
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-scroll  bg-white dark:bg-gray-900">
          <History limit={100} userId={session.user.id} />
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
