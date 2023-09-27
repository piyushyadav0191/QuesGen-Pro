"use client";

import { TagCloud } from "react-tagcloud";
import { useRouter } from "next/navigation";
import randomColor from "randomcolor";

type Props = {
  formattedTopic: { value: string; count: number }[];
};

const CustomWordCloud = ({ formattedTopic }: Props) => {
  const router = useRouter();

  return (
    <div>
      <TagCloud
        // @ts-ignore
        height={550}
        className="cursor-pointer"
        // @ts-ignore
        style={{
          fontFamily: "sans-serif",
          fontSize: () => Math.round(Math.random() * 50) + 16,
          color: () =>
            randomColor({
              hue: "blue",
            }),
          padding: 5,
        }}
        minSize={12}
        maxSize={35}
        tags={formattedTopic}
        onClick={(tag: any) => router.push(`/mcq?topic=${tag.value}`)}
      />
    </div>
  );
};

export default CustomWordCloud;
