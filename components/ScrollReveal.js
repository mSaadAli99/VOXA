"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/gsap";
import styles from "./ScrollReveal.module.css";

function introIsPlaying() {
  if (typeof document === "undefined") return false;
  const phase = document.documentElement.dataset.intro;
  return Boolean(phase) && phase !== "leaving" && phase !== "gone";
}

function resolveTrigger(el) {
  /* Prefer the scroll section (rail / pin track) over sticky children —
     sticky titles never cross ScrollTrigger start lines while pinned. */
  return (
    el.closest("[data-snap-section]") ||
    el.closest("section") ||
    el.closest("header") ||
    el
  );
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
  /** Play once when the section enters — needed for sticky showcase rails */
  once = false,
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

    const wordElements = el.querySelectorAll(`.${styles.word}`);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { rotate: 0, clearProps: "transform" });
      gsap.set(wordElements, { opacity: 1, y: 0, filter: "none" });
      return;
    }

    const scroller = scrollContainerRef?.current
      ? scrollContainerRef.current
      : window;
    const trigger = resolveTrigger(el);
    const toggleActions = once
      ? "play none none none"
      : "play none none reverse";

    let ctx;
    let observer;

    const opacityFrom = 0;
    const rotationFrom = Math.max(baseRotation, 3);
    const blurFrom = Math.max(blurStrength, 4);

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
              toggleActions,
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
            toggleActions,
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
    once,
  ]);

  return (
    <Tag ref={containerRef} className={className} {...rest}>
      {splitText}
    </Tag>
  );
}
