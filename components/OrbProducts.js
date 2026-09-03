"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import styles from "./OrbProducts.module.css";

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

const PRODUCTS = [
  {
    id: "voice-agent",
    src: "/images/products/voice-agent-platform.webp",
    alt: "VOXA Voice Agent Platform on a laptop display",
    badge: "Voice Agent",
    title: "VOXA Voice Agent Platform",
    body: "An AI voice agent for real estate and e-commerce businesses. It handles lead qualification, order confirmation, and customer follow-up calls.",
    href: "/products#voice-agent",
  },
  {
    id: "communications-suite",
    src: "/images/products/communications-suite.webp",
    alt: "VOXA Communications Suite operations center",
    badge: "Communications Suite",
    title: "VOXA Communications Suite",
    body: "A complete calling platform for contact centers and enterprises — telephony, CRM, omni-channel support, and AI automation in one system.",
    href: "/products#communications-suite",
  },
];

export default function OrbProducts() {
  const trackRef = useRef(null);
  const frameRef = useRef(null);
  const mediaARef = useRef(null);
  const mediaBRef = useRef(null);
  const badgeARef = useRef(null);
  const badgeBRef = useRef(null);
  const scaleFillRef = useRef(null);
  const overlayARef = useRef(null);
  const overlayBRef = useRef(null);
  const bgTitleRef = useRef(null);

  const applyProgress = useCallback((p) => {
    // 0–0.32 expand Voice Agent
    // 0.32–0.42 hold + copy #1
    // 0.42–0.55 crossfade to Communications Suite (shrink toward start size)
    // 0.55–0.88 expand Communications Suite (same growth as #1)
    // 0.88–1 hold + copy #2

    const expand1 = smoothstep(0, 0.32, p);
    const shrink = smoothstep(0.42, 0.55, p);
    const expand2 = smoothstep(0.55, 0.88, p);
    const swap = smoothstep(0.42, 0.55, p);

    // Same size range for both products
    const startW = 36;
    const endW = 56;
    const startH = 48;
    const endH = 72;

    let sizeT = expand1;
    if (p >= 0.42 && p < 0.55) {
      // Ease back to start size while swapping
      sizeT = 1 - shrink;
    } else if (p >= 0.55) {
      sizeT = expand2;
    }

    const w = startW + (endW - startW) * sizeT;
    const h = startH + (endH - startH) * sizeT;
    const mediaScale = 1.1 - 0.1 * sizeT;
    const drift = Math.sin(swap * Math.PI) * 0.02;

    if (frameRef.current) {
      frameRef.current.style.width = `${w}%`;
      frameRef.current.style.height = `${h}%`;
    }

    if (mediaARef.current) {
      mediaARef.current.style.opacity = `${1 - swap}`;
      mediaARef.current.style.transform = `scale(${mediaScale + drift}) translate3d(${-6 * swap}px, 0, 0)`;
      mediaARef.current.style.filter = `blur(${swap * 5}px)`;
    }
    if (mediaBRef.current) {
      mediaBRef.current.style.opacity = `${swap}`;
      mediaBRef.current.style.transform = `scale(${mediaScale + drift}) translate3d(${10 * (1 - swap)}px, 0, 0)`;
      mediaBRef.current.style.filter = `blur(${(1 - swap) * 5 * (swap > 0.02 ? 1 : 0)}px)`;
    }

    // Scale fill mirrors each product's expand
    let fill = 0;
    if (p < 0.42) {
      fill = expand1;
    } else if (p < 0.55) {
      fill = 1 - shrink;
    } else {
      fill = expand2;
    }
    if (scaleFillRef.current) {
      scaleFillRef.current.style.height = `${6 + 94 * fill}%`;
    }

    const badge1In = smoothstep(0.06, 0.28, p);
    const badge1Out = 1 - smoothstep(0.42, 0.52, p);
    const badge2In = smoothstep(0.52, 0.68, p);
    if (badgeARef.current) {
      const o = badge1In * badge1Out;
      badgeARef.current.style.opacity = `${o}`;
      badgeARef.current.style.transform = `translate3d(calc(-42% + ${(1 - o) * -16}px), -50%, 0)`;
    }
    if (badgeBRef.current) {
      badgeBRef.current.style.opacity = `${badge2In}`;
      badgeBRef.current.style.transform = `translate3d(calc(-42% + ${(1 - badge2In) * -16}px), -50%, 0)`;
    }

    if (overlayARef.current) {
      const show =
        smoothstep(0.26, 0.38, p) * (1 - smoothstep(0.4, 0.48, p));
      overlayARef.current.style.opacity = `${show}`;
      overlayARef.current.style.transform = `translate3d(0, ${(1 - show) * 12}px, 0)`;
      overlayARef.current.style.pointerEvents = show > 0.55 ? "auto" : "none";
    }
    if (overlayBRef.current) {
      const show = smoothstep(0.78, 0.9, p);
      overlayBRef.current.style.opacity = `${show}`;
      overlayBRef.current.style.transform = `translate3d(0, ${(1 - show) * 12}px, 0)`;
      overlayBRef.current.style.pointerEvents = show > 0.55 ? "auto" : "none";
    }

    if (bgTitleRef.current) {
      const sink = smoothstep(0.05, 0.5, p);
      bgTitleRef.current.style.transform = `translate3d(0, ${sink * -6}px, 0)`;
      bgTitleRef.current.style.opacity = `${1 - sink * 0.06}`;
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let current = 0;
    let target = 0;
    let running = false;
    const scrollDistance = 2.85;
    const holdDistance = 0.4;
    const smoothing = 0.16;

    const measure = () => {
      const stageH = window.innerHeight;
      track.style.height = `${stageH * (1 + scrollDistance + holdDistance)}px`;
    };

    const readProgress = () => {
      const stageH = window.innerHeight;
      const span = stageH * Math.max(0.01, scrollDistance);
      const top = track.getBoundingClientRect().top;
      return clamp(-top / span, 0, 1);
    };

    const tick = () => {
      const k = smoothing <= 0 ? 1 : 1 - Math.exp(-1 / (60 * smoothing));
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.00035) {
        current = target;
        running = false;
      }
      applyProgress(current);
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
        applyProgress(current);
        return;
      }
      kick();
    };

    const onResize = () => {
      measure();
      target = readProgress();
      current = target;
      applyProgress(current);
    };

    measure();
    target = readProgress();
    current = target;
    applyProgress(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [applyProgress]);

  return (
    <section
      id="our-products"
      className={styles.section}
      aria-label="Our products"
    >
      <div ref={trackRef} className={styles.track}>
        <div className={styles.pin}>
          <h2 ref={bgTitleRef} className={styles.bgTitle}>
            Our Products
          </h2>

          <div className={styles.stage}>
            <div ref={frameRef} className={styles.frame}>
              <div className={styles.mediaClip}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={mediaARef}
                  className={`${styles.media} ${styles.mediaA}`}
                  src={PRODUCTS[0].src}
                  alt={PRODUCTS[0].alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={mediaBRef}
                  className={`${styles.media} ${styles.mediaB}`}
                  src={PRODUCTS[1].src}
                  alt={PRODUCTS[1].alt}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />

                <div ref={overlayARef} className={styles.overlay}>
                  <h3 className={styles.productTitle}>{PRODUCTS[0].title}</h3>
                  <p className={styles.productBody}>{PRODUCTS[0].body}</p>
                  <Link href={PRODUCTS[0].href} className={styles.seeProduct}>
                    See product →
                  </Link>
                </div>

                <div ref={overlayBRef} className={styles.overlay}>
                  <h3 className={styles.productTitle}>{PRODUCTS[1].title}</h3>
                  <p className={styles.productBody}>{PRODUCTS[1].body}</p>
                  <Link href={PRODUCTS[1].href} className={styles.seeProduct}>
                    See product →
                  </Link>
                </div>
              </div>

              <div ref={badgeARef} className={styles.badge}>
                {PRODUCTS[0].badge}
              </div>
              <div ref={badgeBRef} className={`${styles.badge} ${styles.badgeB}`}>
                {PRODUCTS[1].badge}
              </div>
            </div>

            <div className={styles.rail} aria-hidden="true">
              <div className={styles.scale}>
                <div ref={scaleFillRef} className={styles.scaleFill} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
