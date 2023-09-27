import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Hourglass } from "lucide-react";
import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";

type Props = {
  timeEnded: Date;
  timeStarted: Date;
};

const TimeTaken = ({ timeEnded, timeStarted }: Props) => {
  return (
    <Card className="md:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold text-black dark:text-gray-300">
          Time Taken
        </CardTitle>
        <Hourglass />
      </CardHeader>
      <CardContent>
        <div className="text-sm font-medium text-black dark:text-gray-200">
          {formatTimeDelta(differenceInSeconds(timeEnded, timeStarted))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeTaken;
