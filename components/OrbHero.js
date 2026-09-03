"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import TalkToUsButton from "@/components/TalkToUsButton";
import ScrollReveal from "@/components/ScrollReveal";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import styles from "./OrbHero.module.css";

const HOME_DESCRIPTION =
  "VOXA is a voice agent platform. It handles your business's phone calls — qualifying leads, confirming orders, following up with customers — automatically, and turns every call into structured data your team can use.";

export default function OrbHero({ title, description = HOME_DESCRIPTION }) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return undefined;

    let loaded = false;
    const loadAndPlay = () => {
      if (loaded) return;
      loaded = true;
      const source = video.querySelector("source");
      if (source?.dataset.src && !source.getAttribute("src")) {
        source.setAttribute("src", source.dataset.src);
        video.load();
      }
      video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadAndPlay();
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-label={title || "VOXA Orb hero"}
      data-snap-section
      data-nav-tone="dark"
    >
      <div className={styles.media} aria-hidden="true">
        <video
          ref={videoRef}
          className={styles.video}
          muted
          loop
          playsInline
          preload="none"
          poster="/videos/sea-storm.webp"
        >
          <source data-src="/videos/sea-storm.mp4" type="video/mp4" />
        </video>
        <div className={styles.mediaShade} />
      </div>

      <div className={`${styles.copy} ${title ? styles.copyCenter : ""}`}>
        <div
          className={`${styles.copyInner} ${title ? styles.copyInnerCenter : ""}`}
        >
          <motion.div
            className={styles.titleWrap}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            {title ? (
              <h1 className={styles.heading}>{title}</h1>
            ) : (
              <LayoutTextFlip
                text="Turns conversations into"
                words={["Execution", "Action"]}
                duration={1800}
                className={styles.flip}
                textClassName={styles.flipText}
                wordClassName={styles.flipWord}
              />
            )}
          </motion.div>

          <ScrollReveal
            as="p"
            className={styles.description}
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
          >
            {description}
          </ScrollReveal>

          <div className={styles.cta}>
            <TalkToUsButton className={styles.ctaBtn} />
          </div>
        </div>
      </div>
    </section>
  );
}
