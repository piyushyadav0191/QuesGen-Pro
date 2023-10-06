import AiAnswer from "./components/AiAnswer";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="mt-10 mx-4">
      <AiAnswer />
    </div>
  );
};

export default page;
