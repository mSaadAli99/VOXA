"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import rail from "./OrbShowcaseRail.module.css";
import copy from "./AboutPromise.module.css";
import stack from "./SolutionsIndustries.module.css";
import styles from "./TechnologyHowACallWorks.module.css";

const POINTS = [
  "The caller speaks — VOXA turns it into text in real time",
  "The AI reads it, checks your business's approved information, and decides the reply",
  "VOXA speaks back in natural speech, in under two seconds",
];

function Arrow() {
  return (
    <span className={copy.pointArrow} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12h12M13 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function TechnologyHowACallWorks() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const title = root.querySelector("[data-title]");
    const points = root.querySelectorAll("[data-point]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(title, { autoAlpha: 1 });
      gsap.set(points, { color: "#01002a" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(title, { autoAlpha: 0, y: 20 });
      gsap.set(points, { color: "#ffffff" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.3,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(title, { autoAlpha: 1, y: 0, duration: 0.32, ease: "power2.out" });
      tl.to({}, { duration: 0.25 });
      points.forEach((point) => {
        tl.to(point, { color: "#01002a", duration: 0.35, ease: "none" });
      });
      tl.to({}, { duration: 0.25 });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={`${rail.track} ${styles.section}`}
      aria-label="How a call works"
      data-snap-section
      data-snap-protect
    >
      <div className={rail.pin}>
        <div className={`${stack.panelInner} ${styles.panel}`}>
          <div className={`${stack.copyCol} ${styles.copy}`}>
            <h2 className={`${copy.title} ${stack.heading}`} data-title>
              How a call works
            </h2>
            <ol className={`${copy.list} ${copy.listPlain} ${copy.listBullets}`}>
              {POINTS.map((line) => (
                <li key={line} className={copy.item} data-point>
                  <Arrow />
                  <p className={copy.point}>{line}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
