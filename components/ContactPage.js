"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MEETING_URL } from "@/lib/meeting";
import ScrollReveal from "@/components/ScrollReveal";
import legal from "./LegalDocPage.module.css";
import styles from "./ContactPage.module.css";

const INFO = [
  {
    label: "Phone",
    value: "Book a call with the team",
    href: MEETING_URL,
  },
  {
    label: "Address",
    value:
      "B-11, 1st Floor, KDA Scheme 1-A Ext., Opp. National Stadium, Karachi",
  },
  {
    label: "Email",
    value: "info@ai-voxa.com",
    href: "mailto:info@ai-voxa.com",
  },
  {
    label: "Visit us",
    value: "ai-voxa.com",
    href: "https://ai-voxa.com",
  },
];

const SECTIONS = [
  { id: "company-information", title: "Company information" },
  { id: "send-a-message", title: "Send a message" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const nodes = SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter(Boolean);

    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.1, 0.35, 0.6],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`VOXA inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\n${message}`,
    );
    window.location.href = `mailto:info@ai-voxa.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main className={legal.page}>
      <section
        className={legal.hero}
        aria-label="Contact us"
        data-nav-tone="dark"
      >
        <div className={legal.heroInner}>
          <ScrollReveal
            as="h1"
            className={legal.title}
            once
            baseOpacity={0.12}
            enableBlur
            baseRotation={0}
            blurStrength={4}
          >
            Contact us
          </ScrollReveal>
          <ScrollReveal
            as="p"
            className={legal.effective}
            once
            baseOpacity={0.15}
            enableBlur
            baseRotation={0}
            blurStrength={3}
          >
            Tell us about your workflow and we&apos;ll help map where VOXA fits.
          </ScrollReveal>
        </div>
        <svg
          className={legal.heroCurve}
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,120 L0,78 Q720,-8 1440,78 L1440,120 Z"
            fill="#f8f0e5"
          />
        </svg>
      </section>

      <section className={legal.body}>
        <div className={legal.layout}>
          <nav className={legal.nav} aria-label="Contact sections">
            <ul className={legal.navList}>
              {SECTIONS.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    className={`${legal.navItem} ${
                      activeId === section.id ? legal.navItemActive : ""
                    }`}
                    onClick={() => scrollToSection(section.id)}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={legal.content}>
            <article
              id="company-information"
              className={legal.section}
            >
              <ScrollReveal
                as="h2"
                className={legal.heading}
                once
                baseOpacity={0.12}
                enableBlur
                baseRotation={0}
                blurStrength={4}
              >
                Company information
              </ScrollReveal>
              <ScrollReveal
                as="p"
                className={legal.copy}
                once
                baseOpacity={0.15}
                enableBlur
                baseRotation={0}
                blurStrength={3}
              >
                Reach the VOXA team by phone, email, or at our Karachi office.
              </ScrollReveal>
              <dl className={styles.infoList}>
                {INFO.map((item) => (
                  <div key={item.label} className={styles.infoRow}>
                    <dt className={styles.infoLabel}>{item.label}</dt>
                    <dd className={styles.infoValue}>
                      {item.href ? (
                        <a
                          href={item.href}
                          className={styles.infoLink}
                          target={
                            item.href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            item.href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>

            <article id="send-a-message" className={legal.section}>
              <ScrollReveal
                as="h2"
                className={legal.heading}
                once
                baseOpacity={0.12}
                enableBlur
                baseRotation={0}
                blurStrength={4}
              >
                Send a message
              </ScrollReveal>
              <ScrollReveal
                as="p"
                className={legal.copy}
                once
                baseOpacity={0.15}
                enableBlur
                baseRotation={0}
                blurStrength={3}
              >
                Share a few details and we&apos;ll get back to you. Prefer a live
                conversation? Book a call instead.
              </ScrollReveal>

              {sent ? (
                <p className={legal.copy}>
                  Thanks. Your email client should open with the message ready
                  to send.
                </p>
              ) : (
                <form className={styles.form} onSubmit={onSubmit}>
                  <label className={styles.field}>
                    <span>Full name</span>
                    <input
                      name="name"
                      type="text"
                      placeholder="Your name"
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Email address</span>
                    <input
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Company name</span>
                    <input
                      name="company"
                      type="text"
                      placeholder="Company"
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Message</span>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="How can we help?"
                      required
                    />
                  </label>
                  <div className={styles.actions}>
                    <button type="submit" className={styles.submit}>
                      Contact us
                    </button>
                    <Link
                      href={MEETING_URL}
                      className={styles.secondary}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a call
                    </Link>
                  </div>
                </form>
              )}
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
