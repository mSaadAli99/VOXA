"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import BorderGlow from "@/components/BorderGlow";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./OurSolutions.module.css";

const solutions = [
  {
    id: "real-estate",
    title: "Real Estate",
    body: "Every lead answered and qualified within seconds, day or night.",
    href: "/solutions#real-estate",
  },
  {
    id: "e-commerce",
    title: "E-Commerce",
    body: "Every order confirmed before dispatch. Every delivery followed up automatically.",
    href: "/solutions#e-commerce",
  },
];

export default function OurSolutions() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const mobileMq = window.matchMedia("(max-width: 767px)");
    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ctx;
    let resizeTimer;

    const build = () => {
      ctx?.revert();
      ctx = undefined;
      gsap.set(track, { x: 0 });

      if (mobileMq.matches || motionMq.matches) return;

      ctx = gsap.context(() => {
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }, wrap);
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 150);
    };

    build();
    mobileMq.addEventListener("change", build);
    motionMq.addEventListener("change", build);
    window.addEventListener("resize", onResize);

    return () => {
      window.clearTimeout(resizeTimer);
      mobileMq.removeEventListener("change", build);
      motionMq.removeEventListener("change", build);
      window.removeEventListener("resize", onResize);
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      className={styles.wrap}
      id="our-solutions"
      data-snap-section
      data-snap-protect
    >
      <div className={styles.sticky}>
        <div ref={trackRef} className={styles.track}>
          <div className={styles.panel}>
            <ScrollReveal
              as="h2"
              className={styles.heading}
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
            >
              Our solutions
            </ScrollReveal>
          </div>
          <div className={styles.panel}>
            <div className={styles.grid}>
              {solutions.map((solution) => (
                <BorderGlow
                  key={solution.id}
                  className={styles.glow}
                  edgeSensitivity={30}
                  glowColor="36 45 92"
                  backgroundColor="#f8f0e5"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={["#f8f0e5", "#ffffff", "#314057"]}
                >
                  <article className={styles.card} id={solution.id}>
                    <ScrollReveal
                      as="h3"
                      className={styles.title}
                      baseOpacity={0.1}
                      enableBlur
                      baseRotation={3}
                      blurStrength={4}
                    >
                      {solution.title}
                    </ScrollReveal>
                    <ScrollReveal
                      as="p"
                      className={styles.body}
                      baseOpacity={0.1}
                      enableBlur
                      baseRotation={3}
                      blurStrength={4}
                    >
                      {solution.body}
                    </ScrollReveal>
                    <ScrollReveal
                      as={Link}
                      href={solution.href}
                      className={styles.link}
                      baseOpacity={0.1}
                      enableBlur
                      baseRotation={3}
                      blurStrength={4}
                    >
                      See solution →
                    </ScrollReveal>
                  </article>
                </BorderGlow>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
