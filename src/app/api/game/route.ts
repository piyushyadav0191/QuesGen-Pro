import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { mcqCreationSchema } from "@/schemas/form/mcq";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import axios from "axios";

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();
    const body = await req.json();
    const { amount, topic, type } = mcqCreationSchema.parse(body);
    const game = await prisma.game.create({
      // @ts-ignore
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session?.user.id,
        topic: topic, // acording to es6
        timeEnded: new Date(),
      },
    });
    await prisma.topicCount.upsert({
      where: {
        topic,
      },
      create: {
        topic,
        count: 1,
      },
      update: {
        count: {
          increment: 1,
        },
      },
    });
    const { data } = await axios.post(`${process.env.API_URL}/api/questions`, {
      amount,
      topic,
      type,
    });

    if (type === "mcq") {
      type mcqQuestion = {
        question: string;
        answer: string;
        option1: string;
        option2: string;
        option3: string;
      };
      let manyData = data.questions.map((question: mcqQuestion) => {
        let options = [
          question.answer,
          question.option1,
          question.option2,
          question.option3,
        ];
        options = options.sort(() => Math.random() - 0.5);
        return {
          question: question.question,
          answer: question.answer,
          options: JSON.stringify(options),
          gameId: game.id,
          questionType: "mcq",
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    } else if (type === "open_ended") {
      type openQuestions = {
        question: string;
        answer: string;
      };
      await prisma.question.createMany({
        data: data.questions.map((question: openQuestions) => {
          return {
            question: question.question,
            answer: question.answer,
            gameId: game.id,
            questionType: "open_ended",
          };
        }),
      });
    }
    return NextResponse.json(
      {
        gameId: game.id,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: error },
        {
          status: 400,
        }
      );
    } else {
      console.error("elle gpt error", error);
      return NextResponse.json(
        { error: error },
        {
          status: 500,
        }
      );
    }
  }
};
