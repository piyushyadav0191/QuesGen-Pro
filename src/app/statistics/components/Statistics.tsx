"use client";
import AccuracyCard from "@/components/statistics/Accuracy";
import QuestionsList from "@/components/statistics/QuestionsList";
import ResultCard from "@/components/statistics/ResultCard";
import TimeTaken from "@/components/statistics/TimeTaken";
import { buttonVariants } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  game: any;
  accuracy: number;
};

const Statistics = ({ game, accuracy }: Props) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  //     if (accuracySaved > 0) {
  //         const sendAccuracy = async () => {
  //   await prisma.accuracyRecord.create({
  //     data: {
  //       accuracy: accuracySaved,
  //       userName: session.user?.name || "",
  //       userId: session.user?.id || "",
  //       gameId: game.id,
  //     },
  //   });
  //         }
  //      sendAccuracy()
  //     }

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      {hasMounted && (
        <div className="p-8 mx-auto max-w-7xl bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-black dark:text-gray-300">
              Statistics
            </h2>
            <div className=" flex items-center space-x-2">
              <Link href={"/dashboard"} className={buttonVariants()}>
                <LucideLayoutDashboard className="mr-2 text-black dark:text-gray-200" />
                Back to Dashboard
              </Link>
            </div>
          </div>
          <div className="grid gap-4 mt-4 md:grid-cols-7">
            <ResultCard accuracy={accuracy} />
            <AccuracyCard accuracy={accuracy} />
            <TimeTaken timeEnded={new Date()} timeStarted={game.timeStarted} />
          </div>
          <QuestionsList questions={game.Question} />
        </div>
      )}
    </>
  );
};

export default Statistics;
