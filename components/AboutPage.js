"use client";

import OrbHero from "@/components/OrbHero";
import OrbWhatVoxaDoes from "@/components/OrbWhatVoxaDoes";
import AboutPromise from "@/components/AboutPromise";
import OrbFAQ from "@/components/OrbFAQ";
import ScrollReveal from "@/components/ScrollReveal";
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
  return (
    <main className={styles.page}>
      <OrbHero title="About us" />

      <OrbWhatVoxaDoes
        id="founding-insight"
        label="Founding insight"
        body={FOUNDING_BODY}
      />

      <section
        className={styles.splitSection}
        aria-label="Mission and vision"
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
              Mission
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
              {MISSION}
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
              Vision
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
              {VISION}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <AboutPromise />
      <OrbFAQ items={ABOUT_FAQS} />
    </main>
  );
}
