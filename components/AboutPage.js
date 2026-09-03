"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import OrbHero from "@/components/OrbHero";
import OrbWhatVoxaDoes from "@/components/OrbWhatVoxaDoes";
import AboutPromise from "@/components/AboutPromise";
import OrbFAQ from "@/components/OrbFAQ";
import styles from "./AboutPage.module.css";

const ABOUT_FAQS = [
  {
    q: "Why was VOXA built?",
    a: "Most business conversations look simple, so they get treated as low-value work. VOXA was built on the opposite idea: those calls matter. Handled consistently, they get done right — and they produce usable data that used to disappear the moment the call ended.",
  },
  {
    q: "Does VOXA replace human teams?",
    a: "No. VOXA takes the high-frequency work — qualifying, confirming, following up — so your team spends time on decisions that need a person. Human authority stays in the loop.",
  },
  {
    q: "What does VOXA actually do with each call?",
    a: "Every conversation is handled to a playbook, then turned into structured action: CRM updates, alerts, tickets, and records your operation can use — not a transcript nobody reads.",
  },
  {
    q: "Who is VOXA for?",
    a: "Teams that live on the phone: real estate, e-commerce, contact centers, and operations that cannot afford missed calls, slow follow-up, or lost context.",
  },
  {
    q: "How do we get started?",
    a: "Talk to us. We map the conversations that matter, run a guided pilot, and expand only when the agent is doing the work your team can trust.",
  },
];

const FOUNDING_BODY =
  "Every business runs on conversations that look simple — confirming an order, qualifying a lead, checking in with a customer. Because they look simple, they get treated as low-value work. VOXA was built on a different idea: these conversations matter more than businesses realize. Handled consistently, they get done right every time — and they produce real, usable data that used to be lost the moment the call ended.";

const MISSION =
  "VOXA deploys intelligent voice agents into high-frequency operational workflows — qualifying leads, confirming orders, capturing customer changes, and collecting structured feedback — so businesses respond faster, execute more consistently, and make decisions from data that reflects what is actually happening in their operations.";

const VISION =
  "A world where every business conversation runs with the precision of a well-designed system — where every call produces structured action, every system of record reflects reality, and every business can grow without growing its headcount at the same rate.";

export default function AboutPage() {
  const splitRef = useRef(null);

  useEffect(() => {
    const root = splitRef.current;
    if (!root) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const card = root.querySelector("[data-card]");
    const left = root.querySelector("[data-col-left]");
    const right = root.querySelector("[data-col-right]");
    const rule = root.querySelector("[data-rule]");
    if (!card || !left || !right || !rule) return undefined;

    const ctx = gsap.context(() => {
      gsap.set(card, { autoAlpha: 0, y: 36, scale: 0.985 });
      gsap.set(left, { autoAlpha: 0, x: -24 });
      gsap.set(right, { autoAlpha: 0, x: 24 });
      gsap.set(rule, { scaleY: 0, transformOrigin: "top center" });

      /* One-shot enter — no pin, so it won't fight the Promise scrub below. */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          once: true,
        },
        defaults: { ease: "power2.out" },
      });

      tl.to(card, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55 });
      tl.to(left, { autoAlpha: 1, x: 0, duration: 0.45 }, "-=0.28");
      tl.to(rule, { scaleY: 1, duration: 0.4 }, "-=0.32");
      tl.to(right, { autoAlpha: 1, x: 0, duration: 0.45 }, "-=0.3");
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, []);

  return (
    <main className={styles.page}>
      <OrbHero title="About us" />

      <OrbWhatVoxaDoes
        id="founding-insight"
        label="Founding insight"
        body={FOUNDING_BODY}
      />

      <section
        ref={splitRef}
        className={styles.splitSection}
        aria-label="Mission and vision"
        data-snap-section
      >
        <div className={styles.card} data-card>
          <div className={styles.col} data-col-left>
            <h2 className={styles.heading}>Mission</h2>
            <p className={styles.copy}>{MISSION}</p>
          </div>
          <div className={styles.rule} data-rule aria-hidden="true" />
          <div className={styles.col} data-col-right>
            <h2 className={styles.heading}>Vision</h2>
            <p className={styles.copy}>{VISION}</p>
          </div>
        </div>
      </section>

      <AboutPromise />
      <OrbFAQ items={ABOUT_FAQS} />
    </main>
  );
}
