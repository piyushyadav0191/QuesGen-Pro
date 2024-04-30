import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request, res: Response) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("userId");
    await prisma.user.delete({
      where: {
        id: id as string,
      },
    });
    return NextResponse.json(
      { msg: "Successfully deleted user" },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error) {
      return NextResponse.json(
        { error },
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
