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

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const label = root.querySelector("[data-label]");
    const copy = root.querySelector("[data-copy]");

    if (reduced) {
      gsap.set(label, { display: "none" });
      gsap.set(copy, { display: "block", autoAlpha: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(label, { autoAlpha: 0, y: 20, display: "flex" });
      gsap.set(copy, { autoAlpha: 0, display: "none" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=280%",
          pin: true,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(label, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" });
      tl.to({}, { duration: 1.4 });
      tl.to(label, { autoAlpha: 0, y: -28, duration: 1.4, ease: "power1.inOut" });
      tl.set(label, { display: "none" });
      tl.set(copy, { display: "block", autoAlpha: 0, y: 16 });
      tl.to(copy, { autoAlpha: 1, y: 0, duration: 1.3, ease: "power2.out" });
      tl.to({}, { duration: 0.6 });
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
      id={id}
      className={styles.track}
      aria-label={ariaLabel || label}
      data-snap-section
      data-snap-protect
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
