import { prisma } from "@/lib/db";
import AiAnswer from "./components/AiAnswer";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const advice = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      careerAdvice: true,
    },
  })


  return (
    <div className="mt-10 mx-4 max-w-3xl">
      <AiAnswer careerAdvice={advice?.careerAdvice}  />
    </div>
  );
};

export default page;
