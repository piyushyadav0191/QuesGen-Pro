"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
    iconSrc: "/icons/sanity.svg",
    title: "Sanity",
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
        <DialogTrigger className="text-8xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-help-circle h-[150px] w-[150px]"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <path d="M12 17h.01" />
          </svg>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modern Tech Stack in QuesGen Pro</DialogTitle>
            <DialogDescription className="bg-white">
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
                      <div className="text-center dark:text-black">
                        {card.title}
                      </div>
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
