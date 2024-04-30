"use client";

import { cn, formatTimeDelta } from "@/lib/utils";
import { Game, Question } from "@prisma/client";
import { differenceInSeconds } from "date-fns";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button, buttonVariants } from "./ui/button";
import { toast } from "sonner";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { checkAnswerSchema } from "@/schemas/form/mcq";
import { z } from "zod";
import axios from "axios";
import BlankAnswerInput from "./BlankAnswers";
import Link from "next/link";
import Confetti from "react-confetti";
import { FeedbackSheet } from "./FeedbackSheet";

type Props = {
  game: Game & { Question: Pick<Question, "answer" | "question">[] };
};

const OpenEnded = ({ game }: Props) => {
  const [dimensions, setDimensions] = useState({width: 0,height: 0});
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [blankAnswer, setBlankAnswer] = useState<string>("");
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(new Date());
  const [questionsReady, setQuestionsReady] = useState<boolean>(false);


  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDimensions({
      width,
      height,
    });
  }, []);
  
  useEffect(() => {
    if (!hasEnded) {
      const interval = setInterval(() => {
        setNow(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hasEnded]);

  const currentQuestions = useMemo(() => {
    return game.Question[questionIndex];
  }, [questionIndex, game.Question]);

  const { mutate: checkAnswer, isLoading: isChecking } = useMutation({
    mutationFn: async () => {
      let filledAnswer = blankAnswer;
      document.querySelectorAll("#user-blank-input").forEach((input) => {
        // @ts-ignore
        filledAnswer = filledAnswer.replace("______", input.value);
        // @ts-ignore
        input.value = "";
      });
      const payload: z.infer<typeof checkAnswerSchema> = {
        // @ts-ignore
        questionId: currentQuestions.id,
        userAnswer: filledAnswer,
      };
      const response = await axios.post("/api/checkanswers", payload);
      return response.data;
    },
  });

  const handleNext = useCallback(() => {
    // if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: ({ percentageSimilar }) => {
        toast.info(`You got ${percentageSimilar}% similar to the correct answer`);
        if (questionIndex === game.Question.length - 1) {
          setHasEnded(true);
          return;
        }
        setQuestionIndex((prev) => prev + 1);
      },
      onError: () => {
        toast.error("An error occurred");
      },
    });
  }, [
    checkAnswer,
    toast,
    isChecking,
    questionIndex,
    game.Question.length,
    // blankAnswer,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
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
            className={cn(buttonVariants(), "mt-2")}
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
    <div className="absolute top-[190px] left-[300px] md:w-[80vw] max-w-4xl w-[90vw]">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <p>
            <span className="text-slate-400">Topic</span>
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}{" "}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>
      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div className=" dark:text-gray-300">{questionIndex + 1}</div>
            <div className="text-base text-slate-400 dark:text-gray-200">
              {game.Question?.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg dark:text-gray-300">
            {currentQuestions?.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4">
        <BlankAnswerInput
          answer={currentQuestions.answer}
          // @ts-ignore
          setBlankAnswer={setBlankAnswer}
        />
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

export default OpenEnded;
