"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export interface FlippingWordSwapProps {
  word1: string;
  word2: string;
  /** Flip duration in ms */
  duration?: number;
  /** Per-character stagger in ms */
  stagger?: number;
  className?: string;
  /** Class applied to the revealed (word2) characters */
  toClassName?: string;
  style?: CSSProperties;
}

/**
 * Displays word1 and flips character-by-character to word2 on hover.
 */
export function FlippingWordSwap({
  word1,
  word2,
  duration = 400,
  stagger = 44,
  className,
  toClassName,
  style,
}: FlippingWordSwapProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const durationSec = duration / 1000;
  const staggerSec = stagger / 1000;

  const renderChars = (
    text: string,
    charClass: string,
    initialStyles: CSSProperties = {},
    extraClassName = "",
  ) =>
    text.split("").map((char, index) => (
      <span
        key={`${charClass}-${index}`}
        className={cn("inline-block", charClass, extraClassName)}
        style={initialStyles}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const word1Chars = gsap.utils.toArray<HTMLElement>(".char-1", root);
      const word2Chars = gsap.utils.toArray<HTMLElement>(".char-2", root);
      if (!word1Chars.length || !word2Chars.length) return;

      const tl = gsap.timeline({ paused: true });

      tl.to(word1Chars, {
        rotationX: 90,
        opacity: 0,
        transformOrigin: "center top",
        stagger: staggerSec,
        duration: durationSec,
        ease: "power2.in",
      }).to(
        word2Chars,
        {
          rotationX: 0,
          opacity: 1,
          transformOrigin: "center bottom",
          stagger: staggerSec,
          duration: durationSec,
          ease: "power2.out",
        },
        `<${Math.max(durationSec * 0.65, 0.05)}`,
      );

      const onEnter = () => tl.play();
      const onLeave = () => tl.reverse();
      const onKey = (event: KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          if (tl.progress() > 0.5) tl.reverse();
          else tl.play();
        }
      };

      root.addEventListener("mouseenter", onEnter);
      root.addEventListener("mouseleave", onLeave);
      root.addEventListener("keydown", onKey);

      return () => {
        root.removeEventListener("mouseenter", onEnter);
        root.removeEventListener("mouseleave", onLeave);
        root.removeEventListener("keydown", onKey);
        tl.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [word1, word2, durationSec, staggerSec],
    },
  );

  return (
    <span
      ref={containerRef}
      className={cn(
        "relative inline-block cursor-pointer font-bold [perspective:800px] [transform-style:preserve-3d]",
        className,
      )}
      style={style}
      role="button"
      tabIndex={0}
      aria-live="polite"
      aria-label={`${word1}, on hover changes to ${word2}`}
    >
      <span className="inline-block" aria-hidden="true">
        {renderChars(word1, "char-1")}
      </span>

      <span className="absolute inset-0 inline-block" aria-hidden="true">
        {renderChars(
          word2,
          "char-2",
          {
            transform: "rotateX(-90deg)",
            opacity: 0,
            transformOrigin: "center bottom",
          },
          toClassName,
        )}
      </span>

      <span className="sr-only">{word1}</span>
    </span>
  );
}
