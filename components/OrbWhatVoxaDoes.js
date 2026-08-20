"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import styles from "./OrbWhatVoxaDoes.module.css";

export default function OrbWhatVoxaDoes() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;

    const gate = root.querySelector("[data-gate]");
    const left = root.querySelector("[data-gate-left]");
    const right = root.querySelector("[data-gate-right]");
    const titleLeft = root.querySelector("[data-title-left]");
    const titleRight = root.querySelector("[data-title-right]");
    const veil = root.querySelector("[data-veil]");
    const reveal = root.querySelector("[data-reveal]");
    const intro = root.querySelector("[data-intro]");

    if (reduced) {
      gsap.set([left, right, gate, veil], { clearProps: "all", opacity: 0, visibility: "hidden" });
      gsap.set(reveal, { opacity: 1, y: 0, filter: "none" });
      gsap.set(intro, { opacity: 1, y: 0 });
      return undefined;
    }

    const travel = mobile ? Math.min(window.innerWidth * 0.62, 280) : Math.min(window.innerWidth * 0.58, 720);
    const depth = mobile ? 18 : 36;

    const ctx = gsap.context(() => {
      gsap.set(reveal, { opacity: 0, y: 28, filter: "blur(8px)" });
      gsap.set(intro, { opacity: 0, y: 18 });
      gsap.set([titleLeft, titleRight], { scale: 1, letterSpacing: "-0.03em" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.05,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        [titleLeft, titleRight],
        {
          scale: 1.04,
          letterSpacing: "0.02em",
          duration: 0.25,
          ease: "power1.inOut",
        },
        0,
      );
      tl.to(veil, { opacity: 0.55, duration: 0.25, ease: "power1.in" }, 0);
      tl.to(
        left,
        { x: -travel * 0.12, rotateY: mobile ? 0 : 4, z: -depth * 0.25, duration: 0.25 },
        0,
      );
      tl.to(
        right,
        { x: travel * 0.12, rotateY: mobile ? 0 : -4, z: -depth * 0.25, duration: 0.25 },
        0,
      );

      tl.to(
        left,
        { x: -travel * 0.55, rotateY: mobile ? 0 : 10, z: -depth * 0.7, duration: 0.25 },
        0.25,
      );
      tl.to(
        right,
        { x: travel * 0.55, rotateY: mobile ? 0 : -10, z: -depth * 0.7, duration: 0.25 },
        0.25,
      );
      tl.to(
        [titleLeft, titleRight],
        { opacity: 0.35, filter: "blur(2px)", scale: 0.96, duration: 0.25 },
        0.25,
      );
      tl.to(veil, { opacity: 0.2, duration: 0.25 }, 0.25);
      tl.to(
        reveal,
        { opacity: 0.55, y: 14, filter: "blur(4px)", duration: 0.25 },
        0.28,
      );

      tl.to(
        left,
        { x: -travel * 1.05, rotateY: mobile ? 0 : 14, z: -depth, duration: 0.25 },
        0.5,
      );
      tl.to(
        right,
        { x: travel * 1.05, rotateY: mobile ? 0 : -14, z: -depth, duration: 0.25 },
        0.5,
      );
      tl.to(gate, { opacity: 0.55, duration: 0.25 }, 0.5);
      tl.to(
        reveal,
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.25 },
        0.5,
      );
      tl.to(intro, { opacity: 1, y: 0, duration: 0.2 }, 0.55);

      tl.to(left, { x: -travel * 1.35, opacity: 0, duration: 0.25 }, 0.75);
      tl.to(right, { x: travel * 1.35, opacity: 0, duration: 0.25 }, 0.75);
      tl.to(gate, { opacity: 0, pointerEvents: "none", duration: 0.2 }, 0.8);
      tl.to(veil, { opacity: 0, duration: 0.15 }, 0.75);
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
      id="what-voxa-does"
      className={styles.track}
      aria-label="What VOXA does"
    >
      <div className={styles.pin}>
        <div className={styles.reveal} data-reveal>
          <div className={styles.revealInner}>
            <div className={styles.intro} data-intro>
              <p className={styles.body}>
                VOXA answers and makes phone calls on behalf of your business. It
                qualifies leads, confirms orders, collects feedback, and books
                callbacks — every time, the same way, at any volume. Every call is
                automatically saved as clean, structured data in your CRM or
                dashboard, so your team never has to enter it by hand.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.gate} data-gate aria-hidden="true">
          <div className={styles.veil} data-veil />
          <div className={styles.gateLeft} data-gate-left>
            <span className={styles.gateTitle} data-title-left>
              What VOXA does
            </span>
          </div>
          <div className={styles.gateRight} data-gate-right>
            <span className={styles.gateTitle} data-title-right>
              What VOXA does
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
