import React from "react";
import CareerAdvice from "./components/CareerAdvice";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

type Props = {};



const page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/");
  }
  return (
    <div className="mt-10 mx-7">
      <CareerAdvice />
    </div>
  );
};

export default page;
