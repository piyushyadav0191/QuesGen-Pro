import React from "react";
import TestiMonial from "./TestiMonial";
import { prisma } from "@/lib/db";

const Testimonials = async () => {
  const data = await prisma.feedback.findMany({
    select: {
      id: true,
      name: true,
      feedback: true,
      user: {
        select: {
          image: true,
        },
      },
    },
  });

  return (
    <div className="text-center">
      <h1 className="text-3xl text-gray-700 font-bold dark:text-gray-300">
        Everyone loves QuesGen Pro!
      </h1>
      <TestiMonial data={data} />
    </div>
  );
};

export default Testimonials;
