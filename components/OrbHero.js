"use client";

import { motion } from "motion/react";
import TalkToUsButton from "@/components/TalkToUsButton";
import ScrollReveal from "@/components/ScrollReveal";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import styles from "./OrbHero.module.css";

export default function OrbHero() {
  return (
    <section
      className={styles.hero}
      aria-label="VOXA Orb hero"
      data-snap-section
    >
      <div className={styles.media} aria-hidden="true">
        <video
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/sea-storm.jpg"
        >
          <source src="/videos/sea-storm.mp4" type="video/mp4" />
        </video>
        <div className={styles.mediaShade} />
      </div>

      <div className={styles.copy}>
        <div className={styles.copyInner}>
          <motion.div
            className={styles.titleWrap}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <LayoutTextFlip
              text="Turns conversations into"
              words={["Execution", "Action"]}
              duration={3000}
              className={styles.flip}
              textClassName={styles.flipText}
              wordClassName={styles.flipWord}
            />
          </motion.div>

          <ScrollReveal
            as="p"
            className={styles.description}
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
          >
            VOXA is a voice agent platform. It handles your business&apos;s
            phone calls — qualifying leads, confirming orders, following up with
            customers — automatically, and turns every call into structured data
            your team can use.
          </ScrollReveal>

          <div className={styles.cta}>
            <TalkToUsButton href="/#talk" className={styles.ctaBtn} />
          </div>
        </div>
      </div>
    </section>
  );
}
