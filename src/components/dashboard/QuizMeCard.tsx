"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Atom } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const QuizMeCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      className="hover:cursor-pointer hover:opacity-75"
      onClick={() => router.push("/mcq")}
    >
      <CardHeader className="flex flex-row items-center dark:bg-gray-900  justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold text-black dark:text-gray-200 underline hover:no-underline">
          MCQ / Open Ended!
        </CardTitle>
        <Atom size={"28"} strokeWidth={2.5} className="text-blue-700" />
      </CardHeader>
      <CardContent>
        <p className="text-sm  text-black dark:text-gray-300 ">
          Try your knowledge
        </p>
      </CardContent>
    </Card>
  );
};

export default QuizMeCard;
