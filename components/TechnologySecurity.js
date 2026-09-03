"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import copy from "./AboutPromise.module.css";
import styles from "./ProductsProducts.module.css";

const POINTS = [
  "Data encrypted at all times",
  "Role-based access control",
  "Full audit trail of every action",
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

export default function TechnologySecurity() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const title = root.querySelector("[data-title]");
    const points = root.querySelectorAll("[data-point]");
    const image = root.querySelector("[data-photo]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([title, image].filter(Boolean), { autoAlpha: 1 });
      gsap.set(points, { color: "#01002a" });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(title, { autoAlpha: 0, y: 20 });
      gsap.set(points, { color: "#ffffff" });
      if (image) gsap.set(image, { autoAlpha: 0, y: 24 });

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
      if (image) {
        tl.to(image, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, "<");
      }
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
      id="security"
      className={styles.featureSection}
      aria-label="Security"
      data-snap-section
      data-snap-protect
    >
      <div className={styles.featureRow}>
        <div className={styles.featureCopy}>
          <h2 className={styles.featureTitle} data-title>
            Security
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
        <div className={styles.featureMedia}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.featureImage}
            src="/images/products/security.webp"
            alt="Data encryption and access control"
            loading="lazy"
            decoding="async"
            data-photo
          />
        </div>
      </div>
    </section>
  );
}
