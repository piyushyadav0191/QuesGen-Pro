import CardDesc from "@/components/CardDesc";
import SignInButton from "@/components/SignInButton";
import Testimonials from "@/components/Testimonials/Testimonials";
import {
  Card,
  CardContent,
  CardDescription,
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
      <div className="min-h-screen flex flex-col justify-center items-center h-[200px] md:h-[400px]">
        {/* First Page - Description */}
        <div className="text-center">
          <Card className="w-[600px]  bg-white dark:bg-gradient-dark">
            <CardHeader>
              <CardTitle className="dark:text-gray-200">
                <CardDesc />
              </CardTitle>
              <CardDescription>
                Welcome to our QuesgGen Pro, where knowledge meets assessment!
                Seamlessly submit your multiple-choice questions, challenge
                others with your quizzes, and receive instant, insightful
                results. Empowering learning and curiosity, our platform makes
                testing your knowledge a rewarding journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <SignInButton text="Sign in with Google" />
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Second Page - Testimonials */}
      <div className="mt-36">
        <Testimonials />
      </div>
    </>
  );
}
