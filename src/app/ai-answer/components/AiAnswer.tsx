"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AiAnswer = () => {
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    const fetchanswer = async () => {
      const res = await fetch("/api/learning");
      const data = await res.json();
      setAnswer(JSON.parse(data[0].careerAdvice));
    };
    fetchanswer();
  }, []);

  return (
    <div className="mt-20">
      <div>
        <div>
          <div className="text-2xl font-bold text-center">
            {answer.map((item: any) => (
              <Card className="w-[1500px] mb-4" key={item.question}>
                <CardHeader>
                  <CardTitle>Career Advice</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="code">
                    <pre>{item.answer}</pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAnswer;
