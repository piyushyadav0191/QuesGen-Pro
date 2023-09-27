import React from "react";
import Leaderboard from "./components/Leaderboard";
import { prisma } from "@/lib/db";

type Props = {};

const page = async (props: Props) => {
  // only one highest accuracy record of each user

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
  console.log(topUsers);

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
