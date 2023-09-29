import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { feedbackSchema } from "@/schemas/feedback";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const POST = async (req: Request, res: Response) => {
  try {
    const session = await getAuthSession();
    const body = await req.json();
    const { feedback, name } = feedbackSchema.parse(body);
    await prisma.feedback.create({
      // @ts-ignore
      data: {
        createdAt: new Date(),
        feedback,
        name,
        userId: session?.user?.id,
      },
    });

    return NextResponse.json(
      {
        message: "feedback sent",
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
      console.error(error);
      return NextResponse.json(
        { error: error },
        {
          status: 500,
        }
      );
    }
  }
};
