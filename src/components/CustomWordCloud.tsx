"use client";

import { useRouter } from "next/navigation";
import randomColor from "randomcolor";
import D3WordCloud from "react-d3-cloud";
import { useTheme } from "next-themes";
import { useCallback } from "react";

type Props = {
  formattedTopic: { text: string; value: number }[];
};


const CustomWordCloud = ({ formattedTopic }: Props) => {
  const router = useRouter();

  const theme = useTheme();
  const rotate = useCallback((word: any) => word.value % 360, []);
  const fontSizeMapper = (word: { value: number }) =>
    Math.log2(word.value) * 5 + 16;


  return (
    <>
        <D3WordCloud
        data={formattedTopic}
        height={550}
        font="Times"
        fontSize={fontSizeMapper}
        rotate={rotate}
        padding={10}
        random={Math.random}
        spiral={"archimedean"}
        fill={theme.theme === "dark" ? "white" : "black"}
        onWordClick={(e, d) => {
          router.push("/mcq?topic=" + d.text);
        }}
      />
    </>
  );
};

export default CustomWordCloud;
