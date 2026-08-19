"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import styles from "./OfficeWalk.module.css";

const products = [
  {
    title: "VOXA Voice Agent Platform",
    body: "An AI voice agent for real estate and e-commerce businesses. It handles lead qualification, order confirmation, and customer follow-up calls.",
    href: "/products#voice-agent",
  },
  {
    title: "VOXA Communications Suite",
    body: "A complete calling platform for contact centers and enterprises — telephony, CRM, omni-channel support, and AI automation in one system.",
    href: "/products#communications-suite",
  },
];

const solutions = [
  {
    title: "Real Estate",
    body: "Every lead answered and qualified within seconds, day or night.",
    href: "/solutions#real-estate",
  },
  {
    title: "E-Commerce",
    body: "Every order confirmed before dispatch. Every delivery followed up automatically.",
    href: "/solutions#e-commerce",
  },
];

export default function OfficeWalk() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionMq.matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-fade]", {
        opacity: 0,
        y: -20,
        duration: 0.7,
        stagger: 0.16,
        ease: "power2.out",
        delay: 0.12,
      });

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: -20,
          duration: 0.75,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el.closest("section"),
            start: "top 70%",
          },
        });
      });

      gsap.utils.toArray("[data-stagger]").forEach((group) => {
        gsap.from(group.querySelectorAll("[data-stagger-item]"), {
          opacity: 0,
          y: -20,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: group.closest("section"),
            start: "top 70%",
          },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={styles.walk}>
      <section
        className={`${styles.section} ${styles.hero}`}
        id="hero"
        data-snap-section
      >
        <div
          className={styles.bg}
          style={{ backgroundImage: "url(/images/hero-entrance.png)" }}
        />
        <div
          className={styles.overlay}
          style={{ background: "rgba(0,0,0,0.35)" }}
        />
        <div className={`${styles.inner} ${styles.innerCenter}`}>
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
          <h1 data-hero-fade className={styles.headline}>
            Turns conversations into execution.
          </h1>
          <p data-hero-fade className={styles.lede}>
            VOXA is a voice agent platform. It handles your business&apos;s
            phone calls — qualifying leads, confirming orders, following up —
            automatically, and turns every call into structured data your team
            can use.
          </p>
          <Link data-hero-fade id="talk" href="#talk" className={styles.cta}>
            Talk to us
          </Link>
        </div>
      </section>

      <section
        className={styles.section}
        id="what-voxa-does"
        data-snap-section
      >
        <div
          className={styles.bg}
          style={{ backgroundImage: "url(/images/what-voxa-does.png)" }}
        />
        <div
          className={styles.overlay}
          style={{ background: "rgba(0,0,0,0.4)" }}
        />
        <div className={`${styles.inner} ${styles.innerLeft}`}>
          <p data-reveal className={styles.label}>
            What VOXA does
          </p>
          <h2 data-reveal className={styles.headlineSm}>
            VOXA answers and makes phone calls on behalf of your business.
          </h2>
          <p data-reveal className={styles.body}>
            It qualifies leads, confirms orders, collects feedback, and books
            callbacks — every time, the same way, at any volume. Every call is
            automatically saved as clean, structured data in your CRM or
            dashboard, so your team never has to enter it by hand.
          </p>
        </div>
      </section>

      <section className={styles.section} id="our-products" data-snap-section>
        <div
          className={styles.bg}
          style={{ backgroundImage: "url(/images/our-products.png)" }}
        />
        <div
          className={styles.overlay}
          style={{ background: "rgba(0,0,0,0.35)" }}
        />
        <div className={`${styles.inner} ${styles.innerRight}`}>
          <p data-reveal className={styles.label}>
            Our products
          </p>
          <div className={styles.grid} data-stagger>
            {products.map((product) => (
              <article
                key={product.title}
                className={styles.card}
                data-stagger-item
              >
                <h3 className={styles.cardTitle}>{product.title}</h3>
                <p className={styles.cardBody}>{product.body}</p>
                <Link href={product.href} className={styles.cardLink}>
                  See product <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} id="our-solutions" data-snap-section>
        <div
          className={styles.bg}
          style={{ backgroundImage: "url(/images/our-solutions.png)" }}
        />
        <div
          className={styles.overlay}
          style={{ background: "rgba(0,0,0,0.3)" }}
        />
        <div className={`${styles.inner} ${styles.innerCenter}`}>
          <p data-reveal className={styles.label}>
            Our solutions
          </p>
          <div className={styles.grid} data-stagger>
            {solutions.map((solution) => (
              <article
                key={solution.title}
                className={styles.card}
                data-stagger-item
              >
                <h3 className={styles.cardTitle}>{solution.title}</h3>
                <p className={styles.cardBody}>{solution.body}</p>
                <Link href={solution.href} className={styles.cardLink}>
                  See solution <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
