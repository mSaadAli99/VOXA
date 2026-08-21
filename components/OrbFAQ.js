"use client";

import { Instrument_Serif } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./OrbFAQ.module.css";

const faqSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-faq-serif",
});

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
  const panelRefs = useRef([]);
  const answerRefs = useRef([]);
  const iconRefs = useRef([]);
  const openRef = useRef(null);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    panelRefs.current.forEach((panel, index) => {
      if (!panel) return;
      const answer = answerRefs.current[index];
      const icon = iconRefs.current[index];
      gsap.set(panel, { height: 0, overflow: "hidden" });
      gsap.set(answer, { opacity: 0, y: 12 });
      gsap.set(icon, { rotation: 0 });
    });
  }, []);

  const animateClose = (index) => {
    const panel = panelRefs.current[index];
    const answer = answerRefs.current[index];
    const icon = iconRefs.current[index];
    if (!panel) return;

    if (reduceMotion.current) {
      gsap.set(panel, { height: 0 });
      gsap.set(answer, { opacity: 0, y: 12 });
      gsap.set(icon, { rotation: 0 });
      return;
    }

    gsap.killTweensOf([panel, answer, icon]);
    gsap.to(icon, { rotation: 0, duration: 0.28, ease: "power2.out" });
    gsap.to(answer, { opacity: 0, y: 10, duration: 0.2, ease: "power2.in" });
    gsap.to(panel, {
      height: 0,
      duration: 0.4,
      ease: "power3.inOut",
    });
  };

  const animateOpen = (index) => {
    const panel = panelRefs.current[index];
    const answer = answerRefs.current[index];
    const icon = iconRefs.current[index];
    if (!panel) return;

    if (reduceMotion.current) {
      gsap.set(panel, { height: "auto" });
      gsap.set(answer, { opacity: 1, y: 0 });
      gsap.set(icon, { rotation: 45 });
      return;
    }

    gsap.killTweensOf([panel, answer, icon]);
    gsap.set(panel, { height: "auto" });
    const target = panel.offsetHeight;
    gsap.set(panel, { height: 0 });
    gsap.set(answer, { opacity: 0, y: 14 });

    gsap.to(icon, { rotation: 45, duration: 0.35, ease: "power2.out" });
    gsap.to(panel, {
      height: target,
      duration: 0.48,
      ease: "power3.out",
      onComplete: () => {
        gsap.set(panel, { height: "auto" });
      },
    });
    gsap.to(answer, {
      opacity: 1,
      y: 0,
      duration: 0.42,
      delay: 0.08,
      ease: "power2.out",
    });
  };

  const onToggle = (index) => {
    const current = openRef.current;
    if (current === index) {
      animateClose(index);
      openRef.current = null;
      setOpen(null);
      return;
    }

    if (current !== null && current !== undefined) {
      animateClose(current);
    }
    animateOpen(index);
    openRef.current = index;
    setOpen(index);
  };

  return (
    <section
      id="faq"
      className={`${styles.section} ${faqSerif.variable}`}
      aria-label="Frequently asked questions"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <div className={styles.lede}>
            <ScrollReveal
              as="p"
              className={styles.ledeLine}
              baseOpacity={0.1}
              enableBlur
              baseRotation={2}
              blurStrength={4}
            >
              Got questions?
            </ScrollReveal>
            <ScrollReveal
              as="p"
              className={styles.ledeLine}
              baseOpacity={0.1}
              enableBlur
              baseRotation={2}
              blurStrength={4}
            >
              Say less, we've got answers!
            </ScrollReveal>
          </div>
          <h2 className={styles.mark}>
            <ScrollReveal
              as="span"
              className={styles.markText}
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
            >
              FAQ's
            </ScrollReveal>
            <span className={styles.markArrow} aria-hidden="true">
              ↗
            </span>
          </h2>
        </header>

        <ul className={styles.list} role="list">
          {FAQS.map((item, index) => {
            const isOpen = open === index;
            return (
              <li
                key={item.q}
                className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  onClick={() => onToggle(index)}
                >
                  <ScrollReveal
                    as="span"
                    className={styles.question}
                    baseOpacity={0.1}
                    enableBlur
                    baseRotation={2}
                    blurStrength={3}
                  >
                    {item.q}
                  </ScrollReveal>
                  <span
                    ref={(el) => {
                      iconRefs.current[index] = el;
                    }}
                    className={styles.icon}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <div
                  ref={(el) => {
                    panelRefs.current[index] = el;
                  }}
                  className={styles.panel}
                  role="region"
                >
                  <p
                    ref={(el) => {
                      answerRefs.current[index] = el;
                    }}
                    className={styles.answer}
                  >
                    {item.a}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
