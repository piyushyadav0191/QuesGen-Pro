import HistoryCard from "@/components/dashboard/HistoryCard";
import HotTopicCard from "@/components/dashboard/HotTopicCard";
import QuizMeCard from "@/components/dashboard/QuizMeCard";
import RecentActivities from "@/components/dashboard/RecentActivities";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

type Props = {};

export const metadata = {
  title: "Dashboard | MCQ Platform",
};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return (
    <main className="p-8 mx-auto max-w-7xl bg-white dark:bg-gray-900 ">
      <div className="flex items-center">
        <h1 className="mr-2 text-3xl text-gray-700 border-b-2 border-separate border-black font-bold dark:text-gray-300 tracking-tight">
          Dashboard
        </h1>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicCard />
        <RecentActivities />
      </div>
    </main>
  );
};

export default page;
