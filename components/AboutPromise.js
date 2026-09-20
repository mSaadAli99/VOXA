"use client";

import TalkToUsButton from "@/components/TalkToUsButton";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./AboutPromise.module.css";
import stack from "./SolutionsIndustries.module.css";

const PROMISES = [
  "Every conversation produces structured action.",
  "Every interaction makes your operation more visible.",
  "Every deployment respects human authority.",
  "Your operation gets better with every call — not just faster.",
];

export default function AboutPromise({
  id,
  title = "Our promise",
  intro,
  points = PROMISES,
  showLines = true,
  showCta = true,
  align = "center",
  showBullets = false,
  photos,
}) {
  const copy = (
    <div
      className={
        photos ? `${styles.copyBlock} ${stack.copyCol}` : styles.copyCentered
      }
    >
      <ScrollReveal
        as="h2"
        className={`${styles.title} ${align === "left" ? styles.titleLeft : ""} ${
          photos ? stack.heading : ""
        }`}
        once
        baseOpacity={0.12}
        enableBlur
        baseRotation={0}
        blurStrength={4}
      >
        {title}
      </ScrollReveal>
      {intro ? (
        <ScrollReveal
          as="p"
          className={`${styles.intro} ${align === "left" ? styles.introLeft : ""} ${
            photos ? stack.lede : ""
          }`}
          once
          baseOpacity={0.15}
          enableBlur
          baseRotation={0}
          blurStrength={3}
        >
          {intro}
        </ScrollReveal>
      ) : null}
      <ol
        className={`${styles.list} ${showLines ? "" : styles.listPlain} ${
          showBullets ? styles.listBullets : ""
        }`}
      >
        {points.map((line, index) => (
          <li key={line} className={styles.item}>
            {showBullets ? (
              <span className={styles.pointArrow} aria-hidden="true">
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
            ) : null}
            <ScrollReveal
              as="p"
              className={styles.point}
              once
              baseOpacity={0.15}
              enableBlur
              baseRotation={0}
              blurStrength={3}
            >
              {line}
            </ScrollReveal>
            {showLines && index < points.length - 1 ? (
              <div className={styles.connector} aria-hidden="true">
                <span className={styles.line}>
                  <span className={styles.fill} />
                </span>
                <span className={styles.arrow}>▼</span>
              </div>
            ) : null}
          </li>
        ))}
      </ol>
      {showCta ? (
        <div className={styles.cta}>
          <TalkToUsButton />
        </div>
      ) : null}
    </div>
  );

  return (
    <section
      id={id}
      className={styles.track}
      aria-label={title}
      data-snap-section
    >
      <div
        className={`${styles.pin} ${align === "left" ? styles.pinLeft : ""} ${
          photos ? styles.pinSplit : ""
        }`}
      >
        {copy}
        {photos ? (
          <div className={`${stack.stack} ${styles.photos}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={stack.back}
              src={photos.back}
              alt={photos.backAlt || ""}
              loading="lazy"
              decoding="async"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={stack.front}
              src={photos.front}
              alt={photos.frontAlt || ""}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
