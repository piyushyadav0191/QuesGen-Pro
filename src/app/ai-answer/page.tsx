import AiAnswer from "./components/AiAnswer";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  return (
    <div className="mt-10 mx-4 max-w-3xl">
      <AiAnswer />
    </div>
  );
};

export default page;
