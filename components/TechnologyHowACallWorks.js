"use client";

import ScrollReveal from "@/components/ScrollReveal";
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
  return (
    <section
      className={`${rail.track} ${styles.section}`}
      aria-label="How a call works"
      data-snap-section
    >
      <div className={rail.pin}>
        <div className={`${stack.panelInner} ${styles.panel}`}>
          <div className={`${stack.copyCol} ${styles.copy}`}>
            <ScrollReveal
              as="h2"
              className={`${copy.title} ${stack.heading}`}
              once
              baseOpacity={0.12}
              enableBlur
              baseRotation={0}
              blurStrength={4}
            >
              How a call works
            </ScrollReveal>
            <ol className={`${copy.list} ${copy.listPlain} ${copy.listBullets}`}>
              {POINTS.map((line) => (
                <li key={line} className={copy.item}>
                  <Arrow />
                  <ScrollReveal
                    as="p"
                    className={copy.point}
                    once
                    baseOpacity={0.15}
                    enableBlur
                    baseRotation={0}
                    blurStrength={3}
                  >
                    {line}
                  </ScrollReveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
