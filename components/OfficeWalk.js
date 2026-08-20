"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ScrollReveal from "@/components/ScrollReveal";
import AccordionGallery from "@/components/AccordionGallery";
import TalkToUsButton from "@/components/TalkToUsButton";
import { useTheme } from "@/components/ThemeProvider";
import styles from "./OfficeWalk.module.css";

const products = [
  {
    title: "VOXA Voice Agent Platform",
    body: "An AI voice agent for real estate and e-commerce businesses. It handles lead qualification, order confirmation, and customer follow-up calls.",
    href: "/products#voice-agent",
    image: "/images/our-products.png",
  },
  {
    title: "VOXA Communications Suite",
    body: "A complete calling platform for contact centers and enterprises — telephony, CRM, omni-channel support, and AI automation in one system.",
    href: "/products#communications-suite",
    image: "/images/infrastructure.png",
  },
];

const solutions = [
  {
    title: "Real Estate",
    body: "Every lead answered and qualified within seconds, day or night.",
    href: "/solutions#real-estate",
    image: "/images/our-solutions.png",
  },
  {
    title: "E-Commerce",
    body: "Every order confirmed before dispatch. Every delivery followed up automatically.",
    href: "/solutions#e-commerce",
    image: "/images/what-voxa-does.png",
  },
];

export default function OfficeWalk() {
  const rootRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "orb") return undefined;

    const root = rootRef.current;
    if (!root) return;

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionMq.matches) return;

    const ctx = gsap.context(() => {
      if (theme !== "vesper") {
        gsap.from("[data-hero-fade]", {
          opacity: 0,
          y: -20,
          duration: 0.7,
          stagger: 0.16,
          ease: "power2.out",
          delay: 0.12,
        });

        const heroTrack = root.querySelector("[data-hero-track]");
        const heroZoom = root.querySelector("[data-hero-zoom]");
        const heroCopy = root.querySelector("[data-hero-copy]");
        if (heroTrack && heroZoom) {
          const mobile = window.matchMedia("(max-width: 767px)");
          const zoomTrigger = {
            trigger: heroTrack,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.15,
            invalidateOnRefresh: true,
          };

          gsap.fromTo(
            heroZoom,
            { scale: 1 },
            {
              scale: mobile.matches ? 1.15 : 1.4,
              ease: "power2.inOut",
              force3D: true,
              transformOrigin: "50% 48%",
              scrollTrigger: zoomTrigger,
            },
          );

          if (heroCopy) {
            gsap.to(heroCopy, {
              opacity: 0,
              y: -24,
              ease: "power2.in",
              scrollTrigger: {
                trigger: heroTrack,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.15,
                invalidateOnRefresh: true,
              },
            });
          }
        }
      }

      const horizon = root.querySelector("[data-horizon]");
      const horizonRow = root.querySelector("[data-horizon-row]");
      if (
        horizon &&
        horizonRow &&
        !window.matchMedia("(max-width: 767px)").matches
      ) {
        gsap.to(horizonRow, {
          x: () => -window.innerWidth,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: horizon,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, root);

    const applyHash = () => {
      const horizon = root.querySelector("[data-horizon]");
      if (!horizon) return;
      if (window.location.hash === "#our-solutions") {
        const y = horizon.offsetTop + horizon.offsetHeight - window.innerHeight;
        window.scrollTo({ top: Math.max(0, y), behavior: "auto" });
      }
    };

    const refresh = window.setTimeout(() => {
      ScrollTrigger.refresh();
      applyHash();
    }, 50);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [theme]);

  if (theme === "orb") return null;

  return (
    <div ref={rootRef} className={styles.walk}>
      <div className={styles.heroTrack} data-hero-track data-snap-protect>
      <section
        className={`${styles.section} ${styles.hero}`}
        id="hero"
      >
        <div
          className={`${styles.bg} ${styles.heroBg}`}
          data-hero-zoom
          data-office-photo
          style={{ backgroundImage: "url(/images/hero-entrance.png)" }}
        />
        <div
          className={styles.overlay}
          data-office-dim
          style={{ background: "rgba(0,0,0,0.35)" }}
        />
        <div
          className={`${styles.inner} ${styles.innerCenter}`}
          data-hero-copy
        >
          <div data-hero-fade>
            <Image
              src="/logomark.png"
              alt=""
              width={160}
              height={91}
              className={styles.mark}
              priority
            />
          </div>
          <ScrollReveal
            as="h1"
            className={styles.headline}
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            transformOrigin="50% 50%"
          >
            Turns conversations into execution.
          </ScrollReveal>
          <ScrollReveal
            as="p"
            className={styles.lede}
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
            transformOrigin="50% 50%"
          >
            VOXA is a voice agent platform. It handles your business&apos;s phone calls — qualifying leads, confirming orders, following up — automatically, and turns every call into structured data your team can use.
          </ScrollReveal>
          <div data-hero-fade className={styles.ctaWrap}>
            <TalkToUsButton href="#talk" id="talk" />
          </div>
        </div>
      </section>
      </div>

      <section
        className={styles.section}
        id="what-voxa-does"
        data-snap-section
        style={theme === "vesper" ? { background: "#f8f0e5" } : undefined}
      >
        <div
          className={styles.bg}
          data-office-photo
          style={{ backgroundImage: "url(/images/what-voxa-does.png)" }}
        />
        <div
          className={styles.overlay}
          data-office-dim
          style={{ background: "rgba(0,0,0,0.4)" }}
        />
        <div className={`${styles.inner} ${styles.innerLeft}`}>
          <ScrollReveal
            as="p"
            className={styles.label}
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
          >
            What VOXA does
          </ScrollReveal>
          <ScrollReveal
            as="h2"
            className={styles.headlineSm}
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
          >
            VOXA answers and makes phone calls on behalf of your business.
          </ScrollReveal>
          <ScrollReveal
            as="p"
            className={styles.body}
            baseOpacity={0.1}
            enableBlur
            baseRotation={3}
            blurStrength={4}
          >
            It qualifies leads, confirms orders, collects feedback, and books callbacks — every time, the same way, at any volume. Every call is automatically saved as clean, structured data in your CRM or dashboard, so your team never has to enter it by hand.
          </ScrollReveal>
        </div>
      </section>

      <div
        className={styles.horizon}
        data-horizon
        data-snap-protect
        data-snap-section
      >
        <div className={styles.horizonPin}>
          <div className={styles.horizonRow} data-horizon-row>
            <section className={styles.section} id="our-products">
              <div
                className={styles.bg}
                data-office-photo
                style={{ backgroundImage: "url(/images/our-products.png)" }}
              />
              <div
                className={styles.overlay}
                data-office-dim
                style={{ background: "rgba(0,0,0,0.35)" }}
              />
              <div className={`${styles.inner} ${styles.innerCenter}`}>
                <ScrollReveal
                  as="h2"
                  className={styles.sectionHeading}
                  transformOrigin="50% 50%"
                >
                  Our products
                </ScrollReveal>
                <AccordionGallery
                  className={styles.gallery}
                  items={products.map((product) => ({
                    image: product.image,
                    label: product.title,
                    body: product.body,
                    link: product.href,
                    cta: "See product →",
                    alt: product.title,
                  }))}
                  defaultIndex={0}
                  expandRatio={0.58}
                  trigger="hover"
                  accentColor="#f8f0e5"
                  overlayColor="#01002a"
                  textColor="#f8f0e5"
                  grayscale
                  showLabels
                  duration={0.6}
                  ease="power3.out"
                  parallax={0.5}
                  tilt={8}
                  stagger={0.06}
                  height={420}
                  gap={10}
                  radius={16}
                  orientation="horizontal"
                />
              </div>
            </section>

            <section className={styles.section} id="our-solutions">
              <div
                className={styles.bg}
                data-office-photo
                style={{ backgroundImage: "url(/images/our-solutions.png)" }}
              />
              <div
                className={styles.overlay}
                data-office-dim
                style={{ background: "rgba(0,0,0,0.3)" }}
              />
              <div className={`${styles.inner} ${styles.innerCenter}`}>
                <ScrollReveal
                  as="h2"
                  className={styles.sectionHeading}
                  transformOrigin="50% 50%"
                >
                  Our solutions
                </ScrollReveal>
                <AccordionGallery
                  className={styles.gallery}
                  items={solutions.map((solution) => ({
                    image: solution.image,
                    label: solution.title,
                    body: solution.body,
                    link: solution.href,
                    cta: "See solution →",
                    alt: solution.title,
                  }))}
                  defaultIndex={0}
                  expandRatio={0.58}
                  trigger="hover"
                  accentColor="#f8f0e5"
                  overlayColor="#01002a"
                  textColor="#f8f0e5"
                  grayscale
                  showLabels
                  duration={0.6}
                  ease="power3.out"
                  parallax={0.5}
                  tilt={8}
                  stagger={0.06}
                  height={420}
                  gap={10}
                  radius={16}
                  orientation="horizontal"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
