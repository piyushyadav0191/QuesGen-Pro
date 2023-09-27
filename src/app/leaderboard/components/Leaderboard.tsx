"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { formatFullDateAndTime } from "../../../../utils/formatTime";

interface topUsersDetails {
  userId: string;
  _max: {
    accuracy: number;
    userName: string;
    createdAt: Date;
  };
}

type Props = {
  topUsers: topUsersDetails[];
};

const Leaderboard = ({ topUsers }: Props) => {
  return (
    <Table className="bg-white">
      <TableCaption className="text-black">
        Top Scorer of the Month
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] text-black">User id</TableHead>
          <TableHead className="text-black">Name</TableHead>
          <TableHead className="text-black">Date & Time</TableHead>
          <TableHead className="text-black">Accuracy</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topUsers.map((users) => (
          <TableRow key={users.userId}>
            <TableCell className="font-medium text-black">
              {users.userId}
            </TableCell>
            <TableCell className="text-black">{users._max.userName}</TableCell>

            <TableCell className="text-black">
              {formatFullDateAndTime(users._max.createdAt)}
            </TableCell>
            <TableCell className="text-black">{users._max.accuracy}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default Leaderboard;
