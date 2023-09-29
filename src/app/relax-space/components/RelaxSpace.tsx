"use client";
import React from "react";
import { IJokesMotivationTypes } from "../../../../types/main";
import { colors } from "../../../../utils/colors";

type Props = {
  jokes: IJokesMotivationTypes[];
  motivation: IJokesMotivationTypes[];
};

const RelaxSpace = ({ jokes, motivation }: Props) => {
  return (
    <div className="mt-16">
      <div className="px-8">
        <h1 className="text-4xl px-6 font-semibold">Jokes</h1>
        <div className="flex overflow-x-scroll space-x-4 p-4 rounded-md shadow-lg">
          {jokes.map((joke: IJokesMotivationTypes, index) => (
            <div
              key={joke.id}
              className={`rounded-lg p-4 ${
                colors[index % colors.length]
              } text-black dark:text-white`}
              style={{ minWidth: "300px" }}
            >
              {joke.content}
            </div>
          ))}
        </div>
      </div>
      <div className="px-8 mt-8">
        <h1 className="text-4xl px-6 font-semibold">Motivation</h1>
        <div className="flex overflow-x-scroll space-x-4 p-4 rounded-md shadow-lg">
          {motivation.map((motivation: IJokesMotivationTypes, index) => (
            <div
              key={motivation.id}
              className={`rounded-lg p-4 ${
                colors[index % colors.length]
              } text-white`}
              style={{ minWidth: "300px" }}
            >
              {motivation.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelaxSpace;
