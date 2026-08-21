"use client";

import { useCallback, useEffect, useRef } from "react";
import OrbShowcasePanel from "@/components/OrbShowcasePanel";
import styles from "./OrbShowcaseRail.module.css";

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const PRODUCTS = [
  {
    id: "voice-agent",
    src: "/images/products/voice-agent-platform.png",
    alt: "VOXA Voice Agent Platform on a laptop display",
    badge: "Voice Agent",
    title: "VOXA Voice Agent Platform",
    body: "An AI voice agent for real estate and e-commerce businesses. It handles lead qualification, order confirmation, and customer follow-up calls.",
    href: "/#talk",
    cta: "See product →",
  },
  {
    id: "communications-suite",
    src: "/images/products/communications-suite.png",
    alt: "VOXA Communications Suite operations center",
    badge: "Communications Suite",
    title: "VOXA Communications Suite",
    body: "A complete calling platform for contact centers and enterprises — telephony, CRM, omni-channel support, and AI automation in one system.",
    href: "/#talk",
    cta: "See product →",
  },
];

const SOLUTIONS = [
  {
    id: "real-estate",
    src: "/images/solutions/real-estate.png",
    alt: "Modern luxury home for real estate solutions",
    badge: "Real Estate",
    title: "Real Estate",
    body: "Every lead answered and qualified within seconds, day or night.",
    href: "/#talk",
    cta: "See solution →",
  },
  {
    id: "ecommerce",
    src: "/images/solutions/ecommerce.png",
    alt: "E-commerce shopping experience on a laptop",
    badge: "E-Commerce",
    title: "E-Commerce",
    body: "Every order confirmed before dispatch. Every delivery followed up automatically.",
    href: "/#talk",
    cta: "See solution →",
  },
];

const PRODUCTS_SCROLL = 2.85;
const PRODUCTS_HOLD = 0.35;
const HORIZONTAL_SCROLL = 1.15;
const SOLUTIONS_SCROLL = 2.85;
const SOLUTIONS_HOLD = 0.35;

export default function OrbShowcaseRail() {
  const trackRef = useRef(null);
  const sliderRef = useRef(null);
  const productsRef = useRef(null);
  const solutionsRef = useRef(null);

  const apply = useCallback((p) => {
    const productsSpan = PRODUCTS_SCROLL + PRODUCTS_HOLD;
    const horizSpan = HORIZONTAL_SCROLL;
    const solutionsSpan = SOLUTIONS_SCROLL + SOLUTIONS_HOLD;
    const total = productsSpan + horizSpan + solutionsSpan;

    const pEnd = productsSpan / total;
    const hEnd = (productsSpan + horizSpan) / total;

    let prod = 0;
    let sol = 0;
    let x = 0;

    if (p <= pEnd) {
      prod = clamp(p / pEnd, 0, 1);
      sol = 0;
      x = 0;
    } else if (p <= hEnd) {
      prod = 1;
      sol = 0;
      const ht = (p - pEnd) / (hEnd - pEnd || 1e-6);
      const e = ht * ht * (3 - 2 * ht);
      x = e * 100;
    } else {
      prod = 1;
      sol = clamp((p - hEnd) / (1 - hEnd || 1e-6), 0, 1);
      x = 100;
    }

    if (sliderRef.current) {
      sliderRef.current.style.transform = `translate3d(-${x}vw, 0, 0)`;
    }
    productsRef.current?.setProgress(prod);
    solutionsRef.current?.setProgress(sol);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let current = 0;
    let target = 0;
    let running = false;
    const smoothing = 0.14;

    const totalUnits =
      1 +
      PRODUCTS_SCROLL +
      PRODUCTS_HOLD +
      HORIZONTAL_SCROLL +
      SOLUTIONS_SCROLL +
      SOLUTIONS_HOLD;

    const measure = () => {
      track.style.height = `${window.innerHeight * totalUnits}px`;
    };

    const readProgress = () => {
      const span = window.innerHeight * (totalUnits - 1);
      const top = track.getBoundingClientRect().top;
      return clamp(-top / Math.max(0.01, span), 0, 1);
    };

    const tick = () => {
      const k = smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.00035) {
        current = target;
        running = false;
      }
      apply(current);
      raf = running ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (running) return;
      running = true;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      target = readProgress();
      if (smoothing <= 0 || reduceMotion) {
        current = target;
        apply(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      apply(current);
    };

    measure();
    target = readProgress();
    current = target;
    apply(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [apply]);

  return (
    <div
      ref={trackRef}
      className={styles.track}
      data-snap-section
      data-snap-protect
    >
      <div className={styles.pin}>
        <div ref={sliderRef} className={styles.slider}>
          <div className={styles.panel}>
            <OrbShowcasePanel
              ref={productsRef}
              embedded
              sectionId="our-products"
              ariaLabel="Our products"
              heading="Our Products"
              items={PRODUCTS}
            />
          </div>
          <div className={styles.panel}>
            <OrbShowcasePanel
              ref={solutionsRef}
              embedded
              sectionId="our-solutions"
              ariaLabel="Our solutions"
              heading="Our Solutions"
              items={SOLUTIONS}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
