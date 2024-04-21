"use client";

import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, buttonVariants } from "./ui/button";
import MCQCounter from "./MCQCounter";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { checkAnswerSchema } from "@/schemas/form/mcq";
import {toast} from "sonner"
import Link from "next/link";
import { cn, formatTimeDelta } from "@/lib/utils";
import Confetti from "react-confetti";
import { FeedbackSheet } from "./FeedbackSheet";

type Props = {
  game: Game & { Question: Pick<Question, "id" | "options" | "question">[] };
};

const MCQ = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [now, setNow] = useState<Date>(new Date());

  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({
      width,
      height,
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [hasEnded]);

  const currentQuestions = useMemo(() => {
    return game.Question[questionIndex];
  }, [questionIndex, game.Question]);

  const options = useMemo(() => {
    if (!currentQuestions) return [];
    if (!currentQuestions.options) return [];
    return JSON.parse(currentQuestions.options as string) as string[];
  }, [currentQuestions]);

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestions.id,
        userAnswer: options[selectedChoice],
      };
      const response = await axios.post("/api/checkanswers", payload);
      return response.data;
    },
  });

  const handleNext = useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          toast.success("Correct Answer");
          setCorrectAnswers((prev) => prev + 1);
        } else {
          toast.error("Wrong Answer");
          setWrongAnswers((prev) => prev + 1);
        }
        if (questionIndex === game.Question.length - 1) {
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
      onError: () => {
        toast.error("Error checking answer");
      },
    });
  }, [checkAnswer, toast, isChecking, questionIndex, game.Question.length]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "1") {
        setSelectedChoice(0);
      } else if (event.key === "2") {
        setSelectedChoice(1);
      } else if (event.key === "3") {
        setSelectedChoice(2);
      } else if (event.key === "4") {
        setSelectedChoice(3);
      } else if (event.key === "Enter") {
        handleNext();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext]);

  if (hasEnded) {
    return (
      <>
        <Confetti width={dimensions.width} height={dimensions.height} />
        <div className="absolute flex flex-col justify-center top-1/2 left-[45%]">
          <div className="px-4 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
            You have completed in{" "}
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
          <Link
            href={`/statistics/${game.id}`}
            className={cn(buttonVariants(), "mt-2 border-black border-2")}
          >
            View Statistics
            <BarChart className="w-4 h-4 ml-2" />
          </Link>
          <FeedbackSheet />
        </div>
      </>
    );
  }

  return (
    <div className="absolute top-[170px] left-[270px] md:w-[80vw] max-w-4xl w-[90vw]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>
            <span className="text-black dark:text-white">Topic</span>
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}{" "}
            </span>
          </p>
          <div className="flex self-start mt-3 text-black dark:text-white">
            <Timer className="mr-2 dark:text-white" color="blue" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>
        <MCQCounter
          wrongAnswers={wrongAnswers}
          correctAnswers={correctAnswers}
        />
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div className="text-black dark:text-gray-300">
              {questionIndex + 1}
            </div>
            <div className="text-base text-black dark:text-gray-200">
              {game.Question?.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg text-black font-bold dark:text-gray-200">
            {currentQuestions?.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => {
          return (
            <Button
              key={index}
              className={cn(
                "justify-start w-full py-8 mb-4 dark:hover:bg-slate-800 hover:bg-gray-400",
                `${
                  selectedChoice === index
                    ? "dark:bg-white bg-black text-white dark:text-black"
                    : ""
                }`
              )}
              variant={selectedChoice === index ? "default" : "secondary"}
              onClick={() => setSelectedChoice(index)}
            >
              <div className="flex items-center justify-start">
                <div className="p-2 px-3 mr-5 border rounded-md">
                  {index + 1}
                </div>
                <div className="text-start">{option}</div>
              </div>
            </Button>
          );
        })}
        <Button
          variant={"mcqButton"}
          onClick={() => {
            handleNext();
          }}
          className="mt-2"
        >
          {isChecking && <Loader2 className="m-4 h-4 mr-2 animate-spin" />}
          Next <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MCQ;
