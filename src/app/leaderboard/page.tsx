import React from "react";
import Leaderboard from "./components/Leaderboard";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  // only one highest accuracy record of each user
  if (!session?.user) {
    return redirect("/");
  }

  const topUsers = await prisma.accuracyRecord.groupBy({
    by: ["userId"],
    _max: {
      accuracy: true,
      userName: true,
      createdAt: true,
    },
    orderBy: {
      _max: {
        accuracy: "desc",
      },
    },
  });

  return (
    <div className="absolute top-1/3 left-1/3">
      <Leaderboard
        // @ts-ignore
        topUsers={topUsers}
      />
    </div>
  );
};

export default page;
