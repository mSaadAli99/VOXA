"use client";

import OrbHero from "@/components/OrbHero";
import TechnologyHowACallWorks from "@/components/TechnologyHowACallWorks";
import TechnologySecurity from "@/components/TechnologySecurity";
import OrbFAQ from "@/components/OrbFAQ";
import ScrollReveal from "@/components/ScrollReveal";
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
  return (
    <main className={styles.page}>
      <OrbHero
        title="Technology"
        description="A simple look at how VOXA works."
      />
      <TechnologyHowACallWorks />
      <section
        className={styles.splitSection}
        aria-label="Data capture and isolation"
        data-snap-section
      >
        <div className={styles.card}>
          <div className={styles.col}>
            <ScrollReveal
              as="h2"
              className={styles.heading}
              once
              baseOpacity={0.12}
              enableBlur
              baseRotation={0}
              blurStrength={4}
            >
              {DATA_TITLE}
            </ScrollReveal>
            <ScrollReveal
              as="p"
              className={styles.copy}
              once
              baseOpacity={0.15}
              enableBlur
              baseRotation={0}
              blurStrength={3}
            >
              {DATA_COPY}
            </ScrollReveal>
          </div>
          <div className={styles.rule} aria-hidden="true" />
          <div className={styles.col}>
            <ScrollReveal
              as="h2"
              className={styles.heading}
              once
              baseOpacity={0.12}
              enableBlur
              baseRotation={0}
              blurStrength={4}
            >
              {ISOLATION_TITLE}
            </ScrollReveal>
            <ScrollReveal
              as="p"
              className={styles.copy}
              once
              baseOpacity={0.15}
              enableBlur
              baseRotation={0}
              blurStrength={3}
            >
              {ISOLATION_COPY}
            </ScrollReveal>
          </div>
        </div>
      </section>
      <TechnologySecurity />
      <OrbFAQ items={TECHNOLOGY_FAQS} />
    </main>
  );
}
