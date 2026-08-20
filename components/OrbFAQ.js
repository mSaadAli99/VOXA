"use client";

import { useState } from "react";
import styles from "./OrbFAQ.module.css";

const FAQS = [
  {
    q: "How does VOXA handle inbound and outbound calls?",
    a: "VOXA answers and places calls on behalf of your business using AI voice agents. Every conversation follows your playbook — qualifying leads, confirming orders, collecting feedback, or booking callbacks — then writes structured data back to your CRM.",
  },
  {
    q: "Can I try VOXA before committing to a plan?",
    a: "Yes. We offer a guided pilot so you can hear the agent on live scenarios, review call transcripts, and measure conversion impact before rolling out across your team.",
  },
  {
    q: "Does VOXA integrate with our existing CRM?",
    a: "VOXA syncs clean call outcomes into popular CRMs and dashboards automatically. Your team gets structured fields — not messy notes — without manual data entry.",
  },
  {
    q: "How natural do the AI voice agents sound?",
    a: "Agents are trained for natural turn-taking, interruptions, and brand tone. You can customize scripts, guardrails, and handoff rules so conversations stay on-brand and on-policy.",
  },
  {
    q: "What happens when a caller needs a human?",
    a: "You define escalation rules. VOXA can book a callback, warm-transfer to your team, or create a ticket with full context so the handoff never loses the thread.",
  },
];

export default function OrbFAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className={styles.section} aria-label="Frequently asked questions">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h2 className={styles.title}>Frequently Asked Questions</h2>
          <p className={styles.subtitle}>
            Everything you need to know about deploying AI agents and automating
            your workflows.
          </p>
        </header>

        <ul className={styles.list} role="list">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <li key={item.q} className={styles.item}>
                <button
                  type="button"
                  className={`${styles.trigger} ${isOpen ? styles.triggerOpen : ""}`}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className={styles.question}>{item.q}</span>
                  <span className={styles.icon} aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
                  role="region"
                >
                  <div className={styles.panelInner}>
                    <p className={styles.answer}>{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
