"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import ScrollReveal from "@/components/ScrollReveal";
import styles from "./OrbCallPreview.module.css";

const SCENARIOS = [
  {
    id: "event",
    title: "Event Invitation",
    summary: "An AI agent will invite you to Zameen.com's property expo in Lahore.",
    intro: "In this call the AI agent will:",
    points: [
      "Introduce herself and ask for a minute to talk",
      "Invite you to the property expo",
      "Ask whether you will come, and roughly how many people",
    ],
    icon: "calendar",
  },
  {
    id: "sales",
    title: "Sales Call",
    summary:
      "An AI agent will inform you about a disease in your crop and offer a free expert visit.",
    intro: "In this call the AI agent will:",
    points: [
      "Confirm she has reached the right farmer",
      "Tell you which problem the scan found in your crop",
      "Offer a free expert visit, and ask whether you want one",
    ],
    icon: "crop",
  },
];

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3.5v4M16 3.5v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function CropIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21V11.5M12 11.5C12 8 8.5 5.5 5 6c.4 3.6 3.4 6 7 5.5Zm0 0c0-3.5 3.5-6 7-5.5-.4 3.6-3.4 6-7 5.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7.2 3.4c.4-.8 1.4-1.1 2.2-.7l1.7.9c.7.4.9 1.3.6 2l-.7 1.6c-.2.4-.1.8.1 1.1l2.2 2.2c.3.3.7.3 1.1.1l1.6-.7c.7-.3 1.6 0 2 .6l.9 1.7c.4.8.1 1.8-.7 2.2l-1.4.7c-3.1 1.5-7.3-.4-10.2-3.3C4.2 10.3 2.3 6.1 3.8 3.1l.7-1.4c.3-.4.8-.5 1.3-.3l1.4.7Z" />
    </svg>
  );
}

function ScenarioPanel({ scenario, open, onToggle }) {
  const [phone, setPhone] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <article className={`${styles.card} ${open ? styles.cardOpen : styles.cardClosed}`} data-card>
      <button
        type="button"
        className={styles.trigger}
        onClick={onToggle}
        aria-expanded={open}
      >
        <span className={styles.icon}>
          {scenario.icon === "calendar" ? <CalendarIcon /> : <CropIcon />}
        </span>
        <span className={styles.triggerCopy}>
          <span className={styles.cardTitle}>{scenario.title}</span>
          {!open ? (
            <span className={styles.cardSummary}>{scenario.summary}</span>
          ) : null}
        </span>
      </button>

      <div className={`${styles.collapse} ${open ? styles.collapseOpen : ""}`}>
        <div className={styles.collapseInner}>
          <div className={styles.panel}>
            <div className={styles.rail} aria-hidden="true" />
            <p className={styles.panelIntro}>{scenario.intro}</p>
            <ul className={styles.points}>
              {scenario.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <form className={styles.form} onSubmit={onSubmit}>
              <div className={styles.phoneField}>
                <span className={styles.dial}>
                  <span className={styles.flag} aria-hidden="true">
                    🇵🇰
                  </span>
                  PK +92
                </span>
                <input
                  className={styles.input}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="300 1234567"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  aria-label="Phone number"
                />
              </div>
              <button type="submit" className={styles.callBtn}>
                <PhoneIcon />
                Call me now
              </button>
            </form>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function OrbCallPreview() {
  const rootRef = useRef(null);
  const [openId, setOpenId] = useState("event");

  const onToggle = (id) => {
    setOpenId(id);
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const cards = root.querySelectorAll("[data-card]");
    const ctx = gsap.context(() => {
      gsap.from(cards, {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
      });
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={styles.section}
      aria-label="Experience Urdu AI calling"
      data-snap-section
      data-snap-step
    >
      <div className={styles.inner}>
        <ScrollReveal as="p" className={styles.kicker} once baseRotation={2} blurStrength={8}>
          Early preview
        </ScrollReveal>
        <ScrollReveal as="h2" className={styles.title} once baseRotation={3} blurStrength={10}>
          Experience Urdu AI calling, right now
        </ScrollReveal>
        <ScrollReveal as="p" className={styles.lede} once baseRotation={2} blurStrength={8}>
          An AI agent will call you on your phone and talk to you in natural Urdu.
        </ScrollReveal>

        <div className={styles.list}>
          {SCENARIOS.map((scenario) => (
            <ScenarioPanel
              key={scenario.id}
              scenario={scenario}
              open={openId === scenario.id}
              onToggle={() => onToggle(scenario.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
