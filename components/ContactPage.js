"use client";

import Link from "next/link";
import { useState } from "react";
import { MEETING_URL } from "@/lib/meeting";
import styles from "./ContactPage.module.css";

const INFO = [
  {
    label: "Phone",
    value: "Book a call with the team",
    href: MEETING_URL,
  },
  {
    label: "Address",
    value: "B-11, 1st Floor, KDA Scheme 1-A Ext., Opp. National Stadium, Karachi",
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

export default function ContactPage() {
  const [sent, setSent] = useState(false);

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
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Contact us</p>
          <h1 className={styles.title}>Let&apos;s talk.</h1>
          <p className={styles.lede}>
            Tell us about your workflow and we&apos;ll help map where VOXA fits.
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.infoCol}>
            <h2 className={styles.heading}>Company information</h2>
            <div className={styles.infoGrid}>
              {INFO.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className={styles.infoCard}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <span className={styles.infoLabel}>{item.label}</span>
                    <span className={styles.infoValue}>{item.value}</span>
                  </a>
                ) : (
                  <div key={item.label} className={styles.infoCard}>
                    <span className={styles.infoLabel}>{item.label}</span>
                    <span className={styles.infoValue}>{item.value}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className={styles.formCol}>
            <h2 className={styles.heading}>Personal information</h2>
            {sent ? (
              <p className={styles.thanks}>
                Thanks. Your email client should open with the message ready to send.
              </p>
            ) : (
              <form className={styles.form} onSubmit={onSubmit}>
                <label className={styles.field}>
                  <span>Enter your full name</span>
                  <input name="name" type="text" placeholder="Your name" required />
                </label>
                <label className={styles.field}>
                  <span>Enter your email address</span>
                  <input name="email" type="email" placeholder="you@company.com" required />
                </label>
                <label className={styles.field}>
                  <span>Company Name</span>
                  <input name="company" type="text" placeholder="Company" />
                </label>
                <label className={styles.field}>
                  <span>Message</span>
                  <textarea name="message" rows={5} placeholder="Type here" required />
                </label>
                <div className={styles.actions}>
                  <button type="submit" className={styles.submit}>
                    Contact us
                  </button>
                  <Link href={MEETING_URL} className={styles.secondary} target="_blank" rel="noopener noreferrer">
                    Book a call
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
