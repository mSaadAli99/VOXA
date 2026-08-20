"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./ScrollReveal.module.css";

function introIsPlaying() {
  if (typeof document === "undefined") return false;
  const phase = document.documentElement.dataset.intro;
  return Boolean(phase) && phase !== "leaving" && phase !== "gone";
}

export default function ScrollReveal({
  children,
  as: Tag = "p",
  className = "",
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0,
  baseRotation = 10,
  blurStrength = 18,
  rotationEnd = "top 40%",
  wordAnimationEnd = "top 32%",
  transformOrigin = "0% 50%",
  ...rest
}) {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === "string" ? children : "";
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) {
        return (
          <span className={styles.space} key={`space-${index}`}>
            {"\u00A0"}
          </span>
        );
      }
      return (
        <span className={styles.word} key={`${word}-${index}`}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const scroller =
      scrollContainerRef?.current ? scrollContainerRef.current : window;
    const wordElements = el.querySelectorAll(`.${styles.word}`);
    const trigger = el.closest("section") || el.closest("header") || el;

    let ctx;
    let observer;

    const opacityFrom = 0;
    const rotationFrom = Math.max(baseRotation, 10);
    const blurFrom = Math.max(blurStrength, 16);

    const play = () => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { transformOrigin, rotate: rotationFrom },
          {
            rotate: 0,
            duration: 1.35,
            ease: "power2.out",
            scrollTrigger: {
              trigger,
              scroller,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );

        if (!wordElements.length) return;

        const from = {
          opacity: opacityFrom,
          y: 22,
          willChange: "opacity, filter, transform",
        };
        if (enableBlur) from.filter = `blur(${blurFrom}px)`;

        const to = {
          opacity: 1,
          y: 0,
          duration: 1.15,
          stagger: 0.07,
          ease: "power2.out",
          scrollTrigger: {
            trigger,
            scroller,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        };
        if (enableBlur) to.filter = "blur(0px)";

        gsap.fromTo(wordElements, from, to);
      }, el);
    };

    if (introIsPlaying()) {
      observer = new MutationObserver(() => {
        if (!introIsPlaying()) {
          observer.disconnect();
          play();
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-intro"],
      });
    } else {
      play();
    }

    return () => {
      observer?.disconnect();
      ctx?.revert();
    };
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
    transformOrigin,
  ]);

  return (
    <Tag ref={containerRef} className={className} {...rest}>
      {splitText}
    </Tag>
  );
}
