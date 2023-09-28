"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileClock } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Props = {};

// animation starts
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
// animation ends

const HistoryCard = (props: Props) => {
  const router = useRouter();
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible">
      <Card
        className="hover:cursor-pointer hover:opacity-75"
        onClick={() => router.push("/history")}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 dark:bg-gray-900 ">
          <CardTitle className="text-2xl font-bold text-black underline hover:no-underline dark:text-gray-200 ">
            History!
          </CardTitle>
          <FileClock size={"28"} className="text-red-600" strokeWidth={2.5} />
        </CardHeader>
        <CardContent>
          <motion.p
            variants={itemVariants}
            className="text-sm text-black dark:text-gray-300"
          >
            See all past given tests
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HistoryCard;
