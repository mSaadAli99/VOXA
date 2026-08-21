"use client";

import Link from "next/link";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./OrbProducts.module.css";

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

export const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};

export function applyShowcaseProgress(refs, p) {
  const {
    frameRef,
    mediaARef,
    mediaBRef,
    badgeARef,
    badgeBRef,
    scaleFillRef,
    overlayARef,
    overlayBRef,
    bgTitleRef,
  } = refs;

  const expand1 = smoothstep(0, 0.32, p);
  const shrink = smoothstep(0.42, 0.55, p);
  const expand2 = smoothstep(0.55, 0.88, p);
  const swap = smoothstep(0.42, 0.55, p);

  const startW = 36;
  const endW = 56;
  const startH = 48;
  const endH = 72;

  let sizeT = expand1;
  if (p >= 0.42 && p < 0.55) {
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
      softstepShow(0.26, 0.38, 0.4, 0.48, p);
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
}

function softstepShow(a0, a1, b0, b1, p) {
  return smoothstep(a0, a1, p) * (1 - smoothstep(b0, b1, p));
}

const OrbShowcasePanel = forwardRef(function OrbShowcasePanel(
  { items, heading, sectionId, ariaLabel, embedded = false },
  ref,
) {
  const frameRef = useRef(null);
  const mediaARef = useRef(null);
  const mediaBRef = useRef(null);
  const badgeARef = useRef(null);
  const badgeBRef = useRef(null);
  const scaleFillRef = useRef(null);
  const overlayARef = useRef(null);
  const overlayBRef = useRef(null);
  const bgTitleRef = useRef(null);
  const refsRef = useRef(null);
  refsRef.current = {
    frameRef,
    mediaARef,
    mediaBRef,
    badgeARef,
    badgeBRef,
    scaleFillRef,
    overlayARef,
    overlayBRef,
    bgTitleRef,
  };

  useImperativeHandle(ref, () => ({
    setProgress: (p) => applyShowcaseProgress(refsRef.current, p),
  }));

  useEffect(() => {
    applyShowcaseProgress(refsRef.current, 0);
  }, []);

  const inner = (
    <div className={embedded ? styles.pinEmbedded : styles.pin}>
      <h2 ref={bgTitleRef} className={styles.bgTitle}>
        <ScrollReveal
          as="span"
          className={styles.bgTitleText}
          baseOpacity={0.1}
          enableBlur
          baseRotation={2}
          blurStrength={4}
        >
          {heading}
        </ScrollReveal>
      </h2>

      <div className={styles.stage}>
        <div ref={frameRef} className={styles.frame}>
          <div className={styles.mediaClip}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={mediaARef}
              className={`${styles.media} ${styles.mediaA}`}
              src={items[0].src}
              alt={items[0].alt}
              draggable={false}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={mediaBRef}
              className={`${styles.media} ${styles.mediaB}`}
              src={items[1].src}
              alt={items[1].alt}
              draggable={false}
            />

            <div ref={overlayARef} className={styles.overlay}>
              <ScrollReveal
                as="h3"
                className={styles.productTitle}
                baseOpacity={0.1}
                enableBlur
                baseRotation={2}
                blurStrength={3}
              >
                {items[0].title}
              </ScrollReveal>
              <ScrollReveal
                as="p"
                className={styles.productBody}
                baseOpacity={0.1}
                enableBlur
                baseRotation={2}
                blurStrength={3}
              >
                {items[0].body}
              </ScrollReveal>
              <Link href={items[0].href} className={styles.seeProduct}>
                {items[0].cta}
              </Link>
            </div>

            <div ref={overlayBRef} className={styles.overlay}>
              <ScrollReveal
                as="h3"
                className={styles.productTitle}
                baseOpacity={0.1}
                enableBlur
                baseRotation={2}
                blurStrength={3}
              >
                {items[1].title}
              </ScrollReveal>
              <ScrollReveal
                as="p"
                className={styles.productBody}
                baseOpacity={0.1}
                enableBlur
                baseRotation={2}
                blurStrength={3}
              >
                {items[1].body}
              </ScrollReveal>
              <Link href={items[1].href} className={styles.seeProduct}>
                {items[1].cta}
              </Link>
            </div>
          </div>

          <div ref={badgeARef} className={styles.badge}>
            {items[0].badge}
          </div>
          <div ref={badgeBRef} className={`${styles.badge} ${styles.badgeB}`}>
            {items[1].badge}
          </div>
        </div>

        <div className={styles.rail} aria-hidden="true">
          <div className={styles.scale}>
            <div ref={scaleFillRef} className={styles.scaleFill} />
          </div>
        </div>
      </div>
    </div>
  );

  if (embedded) {
    return (
      <div id={sectionId} className={styles.sectionEmbedded} aria-label={ariaLabel}>
        {inner}
      </div>
    );
  }

  return (
    <section id={sectionId} className={styles.section} aria-label={ariaLabel}>
      {inner}
    </section>
  );
});

export default OrbShowcasePanel;
