"use client";
import React, { useEffect, useState } from "react";

const AiAnswer = () => {
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    const fetchanswer = async () => {
      const res = await fetch("/api/learning");
      const data = await res.json();
      console.log(data[0].careerAdvice);
      setAnswer(data[0].careerAdvice);
    };
    fetchanswer();
  }, []);

  return (
    <div className="mt-20">
      <pre className="text-2xl font-bold text-center">
        {answer ? answer : "Loading..."}
      </pre>
    </div>
  );
};

export default AiAnswer;
