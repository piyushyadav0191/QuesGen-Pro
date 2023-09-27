"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
type Props = {
  userData: {
    name: string;
    questionCount: number;
  }[];
};

export function OverviewComponent({ userData }: Props) {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={userData}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey="questionCount"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="questionCount" fill="#E11D48" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
