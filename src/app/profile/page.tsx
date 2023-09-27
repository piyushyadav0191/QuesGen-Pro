import { prisma } from "@/lib/db";
import Profile from "./includes/Profile";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
    include: {
      game: {
        include: {
          Question: {
            orderBy: {
              game: {
                timeEnded: "desc", // Order games by 'timeEnded' in descending order
              },
            },
          },
        },
        orderBy: {
          timeStarted: "desc", // Order games by 'timeStarted' in ascending order
        },
      },
    },
  });

  return (
    <div className="h-full mt-12 ">
      <Profile
        // @ts-ignore
        user={user}
      />
    </div>
  );
};

export default page;
