"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TextMorphProps = {
  words: string[];
  interval?: number;
  morphDuration?: number;
  className?: string;
};

export function TextMorph({
  words,
  interval = 2400,
  morphDuration = 680,
  className,
}: TextMorphProps) {
  const list = words.length ? words : [""];
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"in" | "out">("in");

  useEffect(() => {
    if (list.length < 2) return undefined;

    let outTimer = 0;
    const tick = window.setInterval(() => {
      setPhase("out");
      outTimer = window.setTimeout(() => {
        setIndex((i) => (i + 1) % list.length);
        setPhase("in");
      }, morphDuration);
    }, interval);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(outTimer);
    };
  }, [interval, morphDuration, list.length]);

  return (
    <span
      className={cn(
        "relative inline-grid place-items-center align-baseline",
        className,
      )}
      aria-live="polite"
    >
      {/* reserve width of longest word to avoid layout jump */}
      <span className="invisible col-start-1 row-start-1 whitespace-pre" aria-hidden>
        {list.reduce((a, b) => (a.length >= b.length ? a : b), "")}
      </span>
      <span
        className="col-start-1 row-start-1 whitespace-pre transition-[opacity,filter,transform] will-change-[opacity,filter,transform]"
        style={{
          transitionDuration: `${morphDuration}ms`,
          opacity: phase === "in" ? 1 : 0,
          filter: phase === "in" ? "blur(0px)" : "blur(8px)",
          transform: phase === "in" ? "translateY(0)" : "translateY(0.15em)",
        }}
      >
        {list[index]}
      </span>
    </span>
  );
}
