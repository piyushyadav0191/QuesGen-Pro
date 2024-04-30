import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { careerAdviceSchema } from "@/schemas/form/mcq";
import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = 'force-dynamic';



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

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a helpful AI that is able to generate career advice as the answer to that question and do not answer anything other than career advice, store the answer and question in a JSON array. You are to generate an answer about ${topic} for ${experienced}`,
        },
      ],
    });
    
    await prisma.careerAdvice.create({
      data: {
        name: session?.user?.name as string,
        createdAt: new Date(),
        careerAdvice: JSON.stringify(response.choices[0].message),
        userId: session?.user?.id as string,
      },
    })

    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        hasGeneratedAdvice: true,
      },
    });

    return NextResponse.json("success", {
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
