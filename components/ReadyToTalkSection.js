"use client";

import Link from "next/link";
import styles from "./ReadyToTalkSection.module.css";

export default function ReadyToTalkSection() {
  return (
    <section className={styles.section} aria-label="Ready to talk" data-snap-section>
      <div className={styles.inner}>
        <h2 className={styles.headline}>Ready to talk.</h2>
        <Link href="/contact" className={styles.cta}>
          <span className={styles.ctaLabel}>Contact us</span>
        </Link>
      </div>
    </section>
  );
}
