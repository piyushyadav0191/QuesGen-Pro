"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

type Props = {
  finished: boolean;
};

const loadingTexts = [
  "Education is not the filling of a pail, but the lighting of a fire.",
  "The more that you read, the more things you will know. The more that you learn, the more places you'll go.",
  "In learning, you will teach, and in teaching, you will learn.",
  "The beautiful thing about learning is that no one can take it away from you.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
];

const LoadingQuestions = ({ finished }: Props) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);
  useEffect(() => {
    const Interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * loadingTexts.length);
      setLoadingText(loadingTexts[randomIndex]);
    }, 4000);

    return () => clearInterval(Interval);
  }, []);

  useEffect(() => {
    const Interval = setInterval(() => {
      setProgress((prev) => {
        if (finished) return 100;
        if (prev === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prev + 2;
        }
        return prev + 0.5;
      });
    }, 100);
    return () => clearInterval(Interval);
  }, [finished]);

  return (
    <div className="absolute top-[200px] left-[400px] w-[60vw] md:w-[60vw] flex flex-col items-center">
      <h1 className="text-4xl pb-4">Please wait while test is loading...</h1>
      <Image
        src={"/gif/loading.gif"}
        alt="loading questions"
        width={400}
        height={400}
      />
      <Progress
        value={progress}
        className="w-full mt-4 bg-blue-600 dark:bg-white"
      />
      <h1 className="mt-2 text-xl">{loadingText} </h1>
    </div>
  );
};

export default LoadingQuestions;
