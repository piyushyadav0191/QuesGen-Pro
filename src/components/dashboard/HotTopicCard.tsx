import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import CustomWordCloud from "../CustomWordCloud";
import { prisma } from "@/lib/db";

type Props = {};

const HotTopicCard = async (props: Props) => {
  const topics = await prisma.topicCount.findMany({});
  const formattedTopic = topics.map((topic) => {
    return {
      value: topic.topic,
      count: topic.count,
    };
  });

  return (
    <Card className="col-span-4 dark:bg-gray-900 ">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-black underline hover:no-underline dark:text-gray-200 ">
          Hot Topics
        </CardTitle>
        <CardDescription className="text-black dark:text-gray-300">
          Press on Any topic to begin your test!
        </CardDescription>
      </CardHeader>

      <CardContent className="pl-2">
        <CustomWordCloud formattedTopic={formattedTopic} />
      </CardContent>
    </Card>
  );
};

export default HotTopicCard;
