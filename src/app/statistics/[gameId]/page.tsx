import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import Statistics from "../components/Statistics";

type Props = {
  params: {
    gameId: string;
  };
};

const page = async ({ params: { gameId } }: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { Question: true },
  });
  if (!game) {
    return redirect("/mcq");
  }

  let accuracy: number = 0;
  if (game.gameType === "mcq") {
    let totalCorrect = game.Question.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);

    accuracy = (totalCorrect / game.Question.length) * 100; //
  } else if (game.gameType === "open_ended") {
    let totalPercentage = game.Question.reduce((acc, question) => {
      return acc + (question.percentageCurrent ?? 0);
    }, 0);
    accuracy = totalPercentage / game.Question.length;
  }

  accuracy = Math.round(accuracy * 100) / 100;

  if (accuracy > 0) {
    await prisma.accuracyRecord.create({
      data: {
        accuracy,
        userId: session.user.id,
        userName: session.user.name || "",
      },
    });
  }

  return <Statistics game={game} accuracy={accuracy} />;
};

export default page;
