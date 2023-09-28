"use client";

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
  const getColorClass = (index: number) => {
    // Define an array of background colors for the boxes
    const backgroundColors = [
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-pink-200",
      "bg-purple-200",
    ];

    // Use modulo to cycle through the background colors
    return backgroundColors[index % backgroundColors.length];
  };

  return (
    <div className="w-full">
      <h1 className="text-black text-2xl font-bold mb-4">Leaderboard</h1>
      <h2 className="text-black text-lg font-semibold mb-2">
        Top Scorer of the Month
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topUsers.map((users, index) => (
          <div
            key={users.userId}
            className={`bg-white p-4 shadow-md ${getColorClass(index)}`}
          >
            <div className="flex justify-between">
              <p className="text-black">{users._max.userName}</p>
              <p className="text-black">{users._max.accuracy}%</p>
            </div>
            <p className="text-black mt-2">
              {formatFullDateAndTime(users._max.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
