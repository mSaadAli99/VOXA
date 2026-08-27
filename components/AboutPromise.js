"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import TalkToUsButton from "@/components/TalkToUsButton";
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
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const heading = root.querySelector("[data-title]");
    const lede = root.querySelector("[data-intro]");
    const items = root.querySelectorAll("[data-point]");
    const fills = root.querySelectorAll("[data-fill]");
    const arrows = root.querySelectorAll("[data-arrow]");
    const cta = root.querySelector("[data-cta]");

    if (reduced) {
      gsap.set([heading, lede, cta].filter(Boolean), { autoAlpha: 1 });
      gsap.set(items, { color: "#01002a" });
      gsap.set(fills, { scaleY: 1 });
      gsap.set(arrows, { color: "#01002a" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      if (photos) {
        gsap.set(heading, { autoAlpha: 1, y: 0, clearProps: "transform" });
      } else {
        gsap.set(heading, { autoAlpha: 0, y: 20 });
      }
      if (lede) gsap.set(lede, { autoAlpha: 0, y: 16 });
      gsap.set(items, { color: "#ffffff" });
      gsap.set(fills, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(arrows, { color: "#ffffff" });
      if (cta) gsap.set(cta, { autoAlpha: 0, y: 12 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: showLines ? "+=320%" : "+=260%",
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (!photos) {
        tl.to(heading, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" });
      }
      if (lede) {
        tl.to(lede, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" }, "-=0.15");
      }
      tl.to({}, { duration: 0.3 });

      items.forEach((point, index) => {
        tl.to(point, {
          color: "#01002a",
          duration: 0.55,
          ease: "none",
        });
        if (showLines && fills[index]) {
          tl.to(fills[index], { scaleY: 1, duration: 0.7, ease: "power1.inOut" });
          tl.to(arrows[index], { color: "#01002a", duration: 0.2 }, "-=0.15");
        }
      });

      if (cta) {
        tl.to(cta, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });
      }
      tl.to({}, { duration: 0.4 });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [showLines, photos]);

  const copy = (
        <div className={photos ? `${styles.copyBlock} ${stack.copyCol}` : undefined}>
        <h2
          className={`${styles.title} ${align === "left" ? styles.titleLeft : ""} ${
            photos ? stack.heading : ""
          }`}
          data-title
        >
          {title}
        </h2>
        {intro ? (
          <p
            className={`${styles.intro} ${align === "left" ? styles.introLeft : ""} ${
              photos ? stack.lede : ""
            }`}
            data-intro
          >
            {intro}
          </p>
        ) : null}
        <ol
          className={`${styles.list} ${showLines ? "" : styles.listPlain} ${
            showBullets ? styles.listBullets : ""
          }`}
        >
          {points.map((line, index) => (
            <li key={line} className={styles.item} data-point>
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
              <p className={styles.point}>
                {line}
              </p>
              {showLines && index < points.length - 1 ? (
                <div className={styles.connector} aria-hidden="true">
                  <span className={styles.line}>
                    <span className={styles.fill} data-fill />
                  </span>
                  <span className={styles.arrow} data-arrow>
                    ▼
                  </span>
                </div>
              ) : null}
            </li>
          ))}
        </ol>
        {showCta ? (
          <div className={styles.cta} data-cta>
            <TalkToUsButton />
          </div>
        ) : null}
        </div>
  );

  return (
    <section
      ref={rootRef}
      id={id}
      className={styles.track}
      aria-label={title}
      data-snap-section
      data-snap-protect
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
            <img className={stack.back} src={photos.back} alt={photos.backAlt || ""} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={stack.front} src={photos.front} alt={photos.frontAlt || ""} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
