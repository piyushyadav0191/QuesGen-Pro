"use client";

import { Question } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";

type Props = {
  questions: Question[];
};

const QuestionsList = ({ questions }: Props) => {
  console.log(questions);
  let gameType = questions[0].questionType;
  return (
    <Table className="mt-4">
      <TableCaption className="text-black dark:text-gray-300">
        End of List
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[10px] text-black dark:text-gray-200">
            No.
          </TableHead>
          <TableHead className="w-[10px] text-black dark:text-gray-200">
            Question & Correct Answer
          </TableHead>
          <TableHead className="w-[10px] text-black dark:text-gray-200">
            your Answer
          </TableHead>
          {gameType === "open_ended" && (
            <TableHead className="w-[10px] text-right text-black dark:text-gray-200">
              Accuracy
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        <>
          {questions.map((question, index) => {
            return (
              <TableRow key={question.id}>
                <TableCell className="font-medium text-black dark:text-gray-200">
                  {index + 1}
                </TableCell>
                <TableCell className="text-black dark:text-gray-200">
                  {question.question}
                  <br />
                  <br />
                  <span className="font-semibold text-black dark:text-gray-200">
                    {question.answer}{" "}
                  </span>
                </TableCell>
                {gameType === "mcq" && (
                  <TableCell
                    className={cn({
                      "text-green-800": question.isCorrect,
                      "text-red-500": !question.isCorrect,
                    })}
                  >
                    {question.userAnswer}
                  </TableCell>
                )}
                {gameType === "open_ended" && (
                  <TableCell className="text-black dark:text-gray-200">
                    {question.userAnswer}{" "}
                  </TableCell>
                )}
                {gameType === "open_ended" && (
                  <TableCell className="text-right text-black dark:text-gray-200">
                    {question.percentageCurrent}{" "}
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </>
      </TableBody>
    </Table>
  );
};

export default QuestionsList;
