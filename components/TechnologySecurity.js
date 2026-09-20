"use client";

import ScrollReveal from "@/components/ScrollReveal";
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
  return (
    <section
      id="security"
      className={styles.featureSection}
      aria-label="Security"
      data-snap-section
    >
      <div className={styles.featureRow}>
        <div className={styles.featureCopy}>
          <ScrollReveal
            as="h2"
            className={styles.featureTitle}
            once
            baseOpacity={0.12}
            enableBlur
            baseRotation={0}
            blurStrength={4}
          >
            Security
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
        <div className={styles.featureMedia}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={styles.featureImage}
            src="/images/products/security.webp"
            alt="Data encryption and access control"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}
