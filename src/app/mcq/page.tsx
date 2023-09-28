import McqCreation from "@/components/McqCreation";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    topic?: string;
  };
};

export const metadata = {
  title: "QuesGen Pro",
};

const page = async ({ searchParams }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return <McqCreation topicParam={searchParams.topic ?? ""} />;
};

export default page;
