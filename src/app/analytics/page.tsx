import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import AnalyticsDashboard from "./components/AnalyticsDashboard";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();

  if (!session) {
    return redirect("/");
  }

  const userRole = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    select: { role: true },
  });
  if (userRole?.role !== "admin") {
    return redirect("/");
  }

  const totalUsers = await prisma?.user.count();
  const totalGames = await prisma?.game.count();
  const totalTopics = await prisma?.topicCount.count();
  const totalQuestions = await prisma?.question.count();

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
    },
  });

  return (
    <div className="pt-6">
      <AnalyticsDashboard
        totalUsers={totalUsers}
        totalGames={totalGames}
        totalTopics={totalTopics}
        totalQuestions={totalQuestions}
        //@ts-ignore
        users={users}
      />
    </div>
  );
};

export default page;
