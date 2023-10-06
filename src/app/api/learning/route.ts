import { strict_output } from "@/lib/chatgpt";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { careerAdviceSchema } from "@/schemas/form/mcq";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();
    const hasAddvice = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      select: {
        hasGeneratedAdvice: true,
      },
    });
    if (hasAddvice?.hasGeneratedAdvice === true) {
      return NextResponse.json(
        { error: "You have already generated advice" },
        {
          status: 500,
        }
      );
    }

    const body = await req.json();
    const { topic, experienced } = careerAdviceSchema.parse(body);

    // Assuming strict_output returns an array of JSON objects
    const questions = await strict_output(
      `You are a helpful AI that is able to generate career advice as the answer to that question and do not answer anything other than career advice, store the answer and question in a JSON array. You are to generate an answer about ${topic} for ${experienced}`,
      [],
      {
        question: "question",
        answer: "answer",
      }
    );

    // Return the questions array as JSON
    const responseBody = {
      questions: questions,
    };

    await prisma.careerAdvice.create({
      // @ts-ignore
      data: {
        createdAt: new Date(),
        careerAdvice: JSON.stringify(responseBody.questions),
        userId: session?.user?.id,
      },
    });
    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        hasGeneratedAdvice: true,
      },
    });

    return NextResponse.json(responseBody, {
      status: 200,
    });
  } catch (error) {
    console.error("elle gpt error", error);
    return NextResponse.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
};

export const GET = async (req: Request, res: Response) => {
  const session = await getAuthSession();
  try {
    const careerAdvice = await prisma.careerAdvice.findMany({
      where: {
        userId: session?.user?.id,
      },
      select: {
        careerAdvice: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(careerAdvice, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json("something went wrong on learning api" + error, {
      status: 500,
    });
  }
};
