"use client";

import keyword_extracyor from "keyword-extractor";
import { useMemo } from "react";

type Props = {
  answer: string;
  setBlankAnswer: string;
};

const BLANKS = "______";

const BlankAnswerInput = ({ answer, setBlankAnswer }: Props) => {
  const keywords = useMemo(() => {
    const words = keyword_extracyor.extract(answer, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: false,
    });
    const shuffled = words.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  }, [answer]);

  const answerWithBlanks = useMemo(() => {
    const answerWithBlank = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, BLANKS);
    }, answer);
    setBlankAnswer(answerWithBlank);
    return answerWithBlank;
  }, [keywords, answer, setBlankAnswer]);

  return (
    <div className="flex justify-start w-full mt-4">
      <p className="text-xl font-semibold">
        {answerWithBlanks.split(BLANKS).map((part, index) => {
          return (
            <>
              {part}
              {index === answerWithBlanks.split(BLANKS).length - 1 ? null : (
                <input
                  id="user-blank-input"
                  className="dark:border-b-white text-center border-b-2 border-black w-28 focus:border-2 focus-border-b-4 focus:outline-none"
                />
              )}
            </>
          );
        })}
      </p>
    </div>
  );
};

export default BlankAnswerInput;
