import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import History from "../History";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = {};

const RecentActivities = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  const gameCount = await prisma.game.count({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Card className="col-span-4 lg:col-span-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black underline hover:no-underline dark:text-gray-200">
          Recent Activites
        </CardTitle>
        <CardDescription className="text-black dark:text-gray-300">
          You have given a total of {gameCount} game!
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[480px] overflow-y-scroll">
        <History limit={10} userId={session?.user.id} />
      </CardContent>
    </Card>
  );
};

export default RecentActivities;
