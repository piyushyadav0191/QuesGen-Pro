"use client";
import React from "react";

type Props = {
  loading: boolean;
  data: {
    getJokes: {
      id: number;
      content: string;
    };
  };
};

const RelaxSpace = ({ data }: Props) => {
  if (data.loading === true) {
    return <div>loading...</div>;
  }

  return (
    <div>
      {data?.data?.getJokes.map((joke) => {
        return (
          <div key={joke.id}>
            <h3>{joke.content}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default RelaxSpace;
