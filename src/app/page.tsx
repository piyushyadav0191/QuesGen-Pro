import SignInButton from "@/components/SignInButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    // thta means the user is logged in
    return redirect("/dashboard");
  }
  return (
    <>
      <div className="absolute top-1/3 left-1/3 ml-6 ">
        <Card className="w-[600px] bg-white dark:bg-gradient-dark">
          <CardHeader>
            <CardTitle className="dark:text-gray-200">
              Welcome to MCQ Platform!
            </CardTitle>
            <CardDescription className="text-gray-800 dark:text-gray-300 ">
              Welcome to our MCQ platform, where knowledge meets assessment!
              Seamlessly submit your multiple-choice questions, challenge others
              with your quizzes, and receive instant, insightful results.
              Empowering learning and curiosity, our platform makes testing your
              knowledge a rewarding journey.
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2">
            <SignInButton text="Sign in with Google" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
