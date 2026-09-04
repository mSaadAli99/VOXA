"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import OrbHero from "@/components/OrbHero";
import TechnologyHowACallWorks from "@/components/TechnologyHowACallWorks";
import TechnologySecurity from "@/components/TechnologySecurity";
import OrbFAQ from "@/components/OrbFAQ";
import styles from "./AboutPage.module.css";

const DATA_TITLE = "Your data, captured automatically";
const DATA_COPY =
  "Every call is turned into structured data — the fields your business actually needs — and sent straight to your CRM or dashboard. No typing it in by hand.";

const ISOLATION_TITLE = "Built for multiple businesses, safely";
const ISOLATION_COPY =
  "Each business on VOXA is fully isolated. Separate data, separate phone numbers, separate dashboard access. One business can never see another's information.";

const TECHNOLOGY_FAQS = [
  {
    q: "How does VOXA's voice AI work?",
    a: "Agents listen, speak, and follow your playbook in real time — with turn-taking, interruptions, and guardrails you control. Every call is logged as structured data, not just audio.",
  },
  {
    q: "Is our call data secure?",
    a: "Yes. Conversations, recordings, and records are handled under access controls you set. We don't train public models on your customer calls.",
  },
  {
    q: "Can we customize the agent?",
    a: "Scripts, tone, escalation rules, and which systems get updated are all configurable. The agent works your way, not a generic script.",
  },
  {
    q: "What systems can VOXA connect to?",
    a: "CRM, ticketing, notifications, and the operational tools your team already uses. New calls write structured fields back automatically.",
  },
  {
    q: "Do we need to change our phone numbers?",
    a: "No. VOXA can sit on the numbers and trunks you already have, or we can provision new ones. Routing stays under your control.",
  },
];

export default function TechnologyPage() {
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
      <OrbHero
        title="Technology"
        description="A simple look at how VOXA works."
      />
      <TechnologyHowACallWorks />
      <section
        ref={splitRef}
        className={styles.splitSection}
        aria-label="Data capture and isolation"
        data-snap-section
      >
        <div className={styles.card} data-card>
          <div className={styles.col} data-col-left>
            <h2 className={styles.heading}>{DATA_TITLE}</h2>
            <p className={styles.copy}>{DATA_COPY}</p>
          </div>
          <div className={styles.rule} data-rule aria-hidden="true" />
          <div className={styles.col} data-col-right>
            <h2 className={styles.heading}>{ISOLATION_TITLE}</h2>
            <p className={styles.copy}>{ISOLATION_COPY}</p>
          </div>
        </div>
      </section>
      <TechnologySecurity />
      <OrbFAQ items={TECHNOLOGY_FAQS} />
    </main>
  );
}
