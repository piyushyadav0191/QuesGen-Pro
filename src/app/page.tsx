import CardDesc from "@/components/CardDesc";
import SignInButton from "@/components/SignInButton";
import TechStackMark from "@/components/TechStackMark";
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
      <section className="px-2 py-32  md:px-0 mt-40">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white  sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline">QuesGen Pro </span>
                  <span className="block text-indigo-600 xl:inline">
                    take Assessment like a magic.
                  </span>
                </h1>
                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                  Empower learning and curiosity with our platform, allowing you
                  to seamlessly submit questions, challenge others with score,
                  and receive instant, insightful results. Testing your
                  knowledge becomes a rewarding journey.
                </p>
                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                  <SignInButton text="Sign in with Google" />
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                <img src="/gif/landing.gif" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second Page - Testimonials */}
      <div className="text-center mt-40 pt-10">
        <h1 className="text-3xl text-gray-700 font-bold dark:text-gray-300 mb-10">
          Modern Technology used in QuesGen Pro, have a look!
        </h1>

        <TechStackMark />
        <p>
          Click on <span className="text-red-600 text-xl font-semibold">?</span>{" "}
          to know
        </p>
      </div>
      <div className="mt-36">
        <Testimonials />
      </div>
    </>
  );
}
