import { prisma } from "@/lib/db";
import { Clock, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  limit: number;
  userId: string;
};

const History = async ({ limit, userId }: Props) => {
  const games = await prisma.game.findMany({
    where: {
      userId,
    },
    take: limit,
    orderBy: {
      timeStarted: "desc",
    },
  });
  return (
    <div className="space-y-4">
      {games.map((game) => (
        <div
          className="flex items-center border-b border-gray-300 py-4"
          key={game.id}
        >
          <div className="flex items-center">
            <div className="bg-gray-700 rounded-full p-2">
              {game.gameType === "mcq" ? (
                <CopyCheck className="text-white" />
              ) : (
                <Edit2 className="text-white" />
              )}
            </div>
            <div className="ml-4 space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(game.timeStarted).toLocaleString()}
              </p>
              <Link
                href={`statistics/${game.id}`}
                className="text-base font-medium leading-none text-black dark:text-gray-300"
              >
                {game.topic}
              </Link>
              <p className="text-sm text-gray-700 dark:text-gray-500">
                {game.gameType === "mcq"
                  ? "Multiple Choice Questions"
                  : "Open Ended"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
