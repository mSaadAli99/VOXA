"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import BorderGlow from "@/components/BorderGlow";
import styles from "./OurProducts.module.css";

const products = [
  {
    id: "voice-agent",
    title: "VOXA Voice Agent Platform",
    body: "An AI voice agent for real estate and e-commerce businesses. It handles lead qualification, order confirmation, and customer follow-up calls.",
    href: "/products#voice-agent",
  },
  {
    id: "communications-suite",
    title: "VOXA Communications Suite",
    body: "A complete calling platform for contact centers and enterprises — telephony, CRM, omni-channel support, and AI automation in one system.",
    href: "/products#communications-suite",
  },
];

export default function OurProducts() {
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
      id="our-products"
      data-snap-section
      data-snap-protect
    >
      <div className={styles.sticky}>
        <div ref={trackRef} className={styles.track}>
          <div className={styles.panel}>
            <h2 className={styles.heading}>Our products</h2>
          </div>
          <div className={styles.panel}>
            <div className={styles.grid}>
              {products.map((product) => (
                <BorderGlow
                  key={product.id}
                  className={styles.glow}
                  edgeSensitivity={30}
                  glowColor="36 45 92"
                  backgroundColor="#01002a"
                  borderRadius={28}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={["#f8f0e5", "#ffffff", "#314057"]}
                >
                  <article className={styles.card} id={product.id}>
                    <h3 className={styles.title}>{product.title}</h3>
                    <p className={styles.body}>{product.body}</p>
                    <Link href={product.href} className={styles.link}>
                      See product <span aria-hidden="true">→</span>
                    </Link>
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
