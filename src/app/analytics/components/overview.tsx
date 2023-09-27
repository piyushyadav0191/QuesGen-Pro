import { prisma } from "@/lib/db";
import { OverviewComponent } from "./OverviewComponent";

export async function Overview() {
  const usersWithQuestionCount = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      game: {
        select: {
          Question: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const userData = usersWithQuestionCount.map((user) => ({
    name: user.name || "Unknown",
    questionCount: user.game.length,
  }));

  return <OverviewComponent userData={userData} />;
}
