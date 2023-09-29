"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "./ui/card";

type Props = {};

const cardData = [
  {
    iconSrc: "/icons/next.svg",
    title: "Next.js 13",
  },
  {
    iconSrc: "/icons/ts.svg",
    title: "Typescript",
  },
  {
    iconSrc: "/icons/tailwind.svg",
    title: "Tailwind CSS",
  },
  {
    iconSrc: "/icons/framer.svg",
    title: "Framer Motion",
  },
  {
    iconSrc: "/icons/query.svg",
    title: "React Query",
  },
  {
    iconSrc: "/icons/zod.svg",
    title: "Zod",
  },
  {
    iconSrc: "/icons/ai.svg",
    title: "Artificial Intelligence",
  },
  {
    iconSrc: "/icons/graphql.svg",
    title: "GraphQL",
  },
  {
    iconSrc: "/icons/node.svg",
    title: "Node.js",
  },
  {
    iconSrc: "/icons/auth.svg",
    title: "Next Auth",
  },
  {
    iconSrc: "/icons/prisma.svg",
    title: "Prisma",
  },
  {
    iconSrc: "/icons/psql.svg",
    title: "PostgreSQL",
  },
  {
    iconSrc: "/icons/docker.svg",
    title: "Docker",
  },
  {
    iconSrc: "/icons/vercel.svg",
    title: "Vercel Serverless",
  },
];

const TechStackMark = (props: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="text-8xl">?</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modern Tech Stack in QuesGen Pro</DialogTitle>
            <DialogDescription>
              <div>
                <div className="flex flex-wrap">
                  {cardData.map((card, index) => (
                    <div key={index} className="w-3/12 p-4">
                      <div className="mb-4">
                        <img
                          src={card.iconSrc}
                          alt={card.title}
                          className="w-16 h-16 mx-auto"
                        />
                      </div>
                      <div className="text-center">{card.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TechStackMark;
