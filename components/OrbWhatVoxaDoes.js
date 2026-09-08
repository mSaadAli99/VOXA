"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./OrbWhatVoxaDoes.module.css";

const DEFAULT_BODY =
  "VOXA answers and makes phone calls on behalf of your business. It qualifies leads, confirms orders, collects feedback, and books callbacks — every time, the same way, at any volume. Every call is automatically saved as clean, structured data in your CRM or dashboard, so your team never has to enter it by hand.";

export default function OrbWhatVoxaDoes({
  id = "what-voxa-does",
  label = "What VOXA does",
  body = DEFAULT_BODY,
  ariaLabel,
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const labelEl = root.querySelector("[data-label]");
    const copy = root.querySelector("[data-copy]");
    if (!labelEl || !copy) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(labelEl, { display: "none" });
      gsap.set(copy, { display: "block", autoAlpha: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(labelEl, { autoAlpha: 0, y: 24, display: "block" });
      gsap.set(copy, { autoAlpha: 0, display: "none" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.55,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* 1) Title fades in */
      tl.to(labelEl, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" });
      /* 2) Hold title briefly */
      tl.to({}, { duration: 0.7 });
      /* 3) Title out → description in (never both visible) */
      tl.to(labelEl, { autoAlpha: 0, y: -24, duration: 0.55, ease: "power1.inOut" });
      tl.set(labelEl, { display: "none" });
      tl.set(copy, { display: "block", autoAlpha: 0, y: 18 });
      tl.to(copy, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" });
      /* 4) Hold description, then release pin */
      tl.to({}, { duration: 0.45 });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    const refresh2 = window.setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      window.clearTimeout(refresh);
      window.clearTimeout(refresh2);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id={id}
      className={styles.track}
      aria-label={ariaLabel || label}
      data-snap-section
      data-snap-gate
    >
      <div className={styles.pin}>
        <h2 className={styles.label} data-label>
          {label}
        </h2>
        <p className={styles.body} data-copy>
          {body}
        </p>
      </div>
    </section>
  );
}
