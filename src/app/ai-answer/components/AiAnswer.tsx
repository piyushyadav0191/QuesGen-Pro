"use client";

import Markdown from "react-markdown";

const AiAnswer = ({ careerAdvice }: any) => {
  return (
    <div className="mt-20 max-w-7xl mx-auto">
      <div>
        <div className="">
          {careerAdvice.map((advice: any) => {
            const content = JSON.parse(advice.careerAdvice);
            return <Markdown>{content.content}</Markdown>;
          })}
        </div>
      </div>
    </div>
  );
};

export default AiAnswer;
